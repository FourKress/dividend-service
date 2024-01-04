import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CompanyEntity } from './entity/company.entity';
import { CompanyDto, CompanyPageDto } from './dto';
import { ResponseTools } from '../common/utils/response-tools';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { ILeftJoin } from '../common/interfaces/leftJoin.interface';
import { ICompanyItem } from './interface/companyItem';
import { ShareholderTypeEnum } from '../common/enum';

const Moment = require('moment');

@Injectable()
export class CompanyService {
  @InjectRepository(CompanyEntity)
  private readonly companyRepository: Repository<CompanyEntity>;

  private readonly leftJoin: ILeftJoin = {
    mapToProperty: 'company.attribute',
    property: 'company-attribute',
    alias: 'companyAttribute',
    condition:
      'company.attributeId = companyAttribute.id AND companyAttribute.isDelete = false',
  };

  private readonly leftJoinAgentLegalPerson: ILeftJoin = {
    mapToProperty: 'company.agentLegalPerson',
    property: 'shareholder',
    alias: 'agentLegalPerson',
    condition: `company.id = agentLegalPerson.companyId AND agentLegalPerson.isDelete = false AND agentLegalPerson.shareholderType = '${ShareholderTypeEnum.AGENT_LEGAL_PERSON}'`,
  };

  private readonly leftJoinHoldingShareholder: ILeftJoin = {
    mapToProperty: 'company.holdingShareholder',
    property: 'shareholder',
    alias: 'holdingShareholder',
    condition: `company.id = holdingShareholder.companyId AND holdingShareholder.isDelete = false AND holdingShareholder.shareholderType = '${ShareholderTypeEnum.HOLDING_SHAREHOLDER}'`,
  };

  private readonly leftJoinAgentLegalPersonStaff: ILeftJoin = {
    mapToProperty: 'company.agentLegalPersonStaff',
    property: 'staff',
    alias: 'agentLegalPersonStaff',
    condition: `agentLegalPerson.staffId = agentLegalPersonStaff.id AND agentLegalPersonStaff.isDelete = false`,
  };

  private readonly leftJoinHoldingShareholderStaff: ILeftJoin = {
    mapToProperty: 'company.holdingShareholderStaff',
    property: 'staff',
    alias: 'holdingShareholderStaff',
    condition: `holdingShareholder.staffId = holdingShareholderStaff.id AND holdingShareholderStaff.isDelete = false`,
  };

  private readonly leftJoinProxyGrant: ILeftJoin = {
    mapToProperty: 'company.proxyGrant',
    property: 'proxy-grant',
    alias: 'proxyGrant',
    condition: `proxyGrant.companyId = company.id AND proxyGrant.createTime >= '${Moment()
      .startOf('day')
      .format()}' AND proxyGrant.isDelete = false`,
  };

  async findByName(name: string): Promise<CompanyEntity> {
    return this.companyRepository.findOne({
      where: { name, isDelete: false },
    });
  }

  async findByNameAll(names: any[]): Promise<CompanyEntity[]> {
    return await this.companyRepository
      .createQueryBuilder('company')
      .where({
        isDelete: false,
      })
      .andWhere('company.name IN (:...names)', {
        names,
      })
      .getMany();
  }

  async checkCompanyName(name: string, isAdd: boolean): Promise<boolean> {
    const checkByDB = await this.findByName(name);
    if (checkByDB && (isAdd || checkByDB?.name !== name)) {
      ResponseTools.fail('公司名称重复,请检查后重试!');
      return false;
    }
    return true;
  }

  async create(createCompany: CompanyDto): Promise<boolean> {
    await this.checkCompanyName(createCompany.name, true);

    const company = await this.companyRepository.save(createCompany);
    if (!company) {
      return false;
    }
    return true;
  }

  async createBatch(companyList: CompanyDto[]): Promise<boolean> {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .insert()
      .values(companyList)
      .execute();
    if (!company) {
      return false;
    }
    return true;
  }

  async details(id: string): Promise<ICompanyItem> {
    const company = await this.companyRepository
      .createQueryBuilder('company')
      .leftJoinAndMapOne(
        this.leftJoin.mapToProperty,
        this.leftJoin.property,
        this.leftJoin.alias,
        this.leftJoin.condition,
      )
      .where({
        id,
      })
      .getOne();

    if (!company) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return company;
  }

  async editBasicInfo(editBasicInfo: CompanyDto): Promise<boolean> {
    const { id, ...info } = editBasicInfo;

    await this.checkCompanyName(info.name, false);

    const { affected } = await this.companyRepository.update(id, info);
    return affected === 1;
  }

  async getPageList(
    pageSearch: CompanyPageDto,
  ): Promise<IPageInterface<ICompanyItem>> {
    const { name } = pageSearch;
    const params = name
      ? {
          ...pageSearch,
          name: Like(`%${pageSearch?.name}%`),
        }
      : pageSearch;
    return await new PageService(this.companyRepository, params).fetch({
      leftJoinAndMapOne: [
        this.leftJoin,
        this.leftJoinAgentLegalPerson,
        this.leftJoinHoldingShareholder,
        this.leftJoinAgentLegalPersonStaff,
        this.leftJoinHoldingShareholderStaff,
      ],
      leftJoinAndMapMany: [this.leftJoinProxyGrant],
      alias: 'company',
    });
  }
}
