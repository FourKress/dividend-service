import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { CompanyAttributeEntity } from './entity/company-attribute.entity';
import { CompanyAttributeDto, CompanyAttributePageDto } from './dto';
import { ResponseTools } from '../common/utils/response-tools';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { BooleanFlagEnum } from '../common/enum';
import { ILeftJoin } from '../common/interfaces/leftJoin.interface';
import { ICompanyAttributePageItem } from './interface/companyAttributePageItem';

@Injectable()
export class CompanyAttributeService {
  @InjectRepository(CompanyAttributeEntity)
  private readonly companyAttrRepository: Repository<CompanyAttributeEntity>;

  private readonly leftJoinCompany: ILeftJoin = {
    mapToProperty: 'company-attribute.company',
    property: 'company',
    alias: 'company',
    condition:
      'company-attribute.id = company.attributeId AND company.isDelete = false',
  };

  async findByAttribute(attribute: string): Promise<CompanyAttributeEntity> {
    return this.companyAttrRepository.findOne({
      where: { attribute, isDelete: false },
    });
  }

  async findByAttributeAll(
    attributes: any[],
  ): Promise<CompanyAttributeEntity[]> {
    return await this.companyAttrRepository
      .createQueryBuilder('companyAttribute')
      .where({
        isDelete: false,
      })
      .andWhere('companyAttribute.attribute IN (:...attributes)', {
        attributes,
      })
      .getMany();
  }

  async checkAttributeRepeat(
    attribute: string,
    isAdd: boolean,
  ): Promise<boolean> {
    const checkByDB = await this.findByAttribute(attribute);
    if (checkByDB && (isAdd || checkByDB?.attribute !== attribute)) {
      ResponseTools.fail('公司属性重复,请检查后重试!');
      return false;
    }
    return true;
  }

  async checkValue(companyAttribute: CompanyAttributeDto): Promise<boolean> {
    const { checkFlag, settleInQuantity, invoiceAmount, transactionAmount } =
      companyAttribute;

    // 开启考核时, 入驻家数,开票额,交易额必须有一个有值
    if (
      checkFlag === BooleanFlagEnum.TRUE &&
      [settleInQuantity, invoiceAmount, transactionAmount].every((d) => !d)
    ) {
      ResponseTools.fail('至少选择一个考核类型!');
      return false;
    }

    return true;
  }

  async create(createCompanyAttribute: CompanyAttributeDto): Promise<boolean> {
    await this.checkValue(createCompanyAttribute);

    await this.checkAttributeRepeat(createCompanyAttribute.attribute, true);

    const companyAttribute = await this.companyAttrRepository.save(
      createCompanyAttribute,
    );
    if (!companyAttribute) {
      return false;
    }
    return true;
  }

  async delete(id: string): Promise<boolean> {
    const { affected } = await this.companyAttrRepository.update(id, {
      isDelete: true,
    });
    return affected === 1;
  }

  async edit(editCompanyAttribute: CompanyAttributeDto): Promise<boolean> {
    await this.checkValue(editCompanyAttribute);

    const { id, ...info } = editCompanyAttribute;

    await this.checkAttributeRepeat(info.attribute, false);

    const { affected } = await this.companyAttrRepository.update(id, info);
    return affected === 1;
  }

  async details(id: string): Promise<CompanyAttributeEntity> {
    const companyAttribute = await this.companyAttrRepository.findOneBy({
      id,
    });
    if (!companyAttribute) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return companyAttribute;
  }

  async getPageList(
    pageSearch: CompanyAttributePageDto,
  ): Promise<IPageInterface<ICompanyAttributePageItem>> {
    const { attribute } = pageSearch;
    const params = attribute
      ? {
          ...pageSearch,
          attribute: Like(`%${pageSearch?.attribute}%`),
        }
      : pageSearch;
    return await new PageService(this.companyAttrRepository, params).fetch({
      alias: 'company-attribute',
      leftJoinAndMapMany: [this.leftJoinCompany],
    });
  }

  async getList(): Promise<CompanyAttributeEntity[]> {
    return await this.companyAttrRepository.find({
      where: { isDelete: false },
    });
  }
}
