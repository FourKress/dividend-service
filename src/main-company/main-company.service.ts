import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { MainCompanyEntity } from './entity/main-company.entity';
import { MainCompanyDto, MainCompanyPageDto } from './dto';
import { ResponseTools } from '../common/utils/response-tools';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { ILeftJoin } from '../common/interfaces/leftJoin.interface';
import { ShareholderTypeEnum } from '../common/enum';

@Injectable()
export class MainCompanyService {
  @InjectRepository(MainCompanyEntity)
  private readonly mainCompanyRepository: Repository<MainCompanyEntity>;

  private readonly leftJoinVirtualShareholder: ILeftJoin = {
    mapToProperty: 'mainCompany.virtualShareholder',
    property: 'shareholder',
    alias: 'virtualShareholder',
    condition: `mainCompany.id = virtualShareholder.companyId AND virtualShareholder.isDelete = false AND virtualShareholder.shareholderType = '${ShareholderTypeEnum.VIRTUAL_SHAREHOLDER}'`,
  };

  async findByName(name: string): Promise<MainCompanyEntity> {
    return this.mainCompanyRepository.findOne({
      where: { name, isDelete: false },
    });
  }

  async findByNameAll(names: any[]): Promise<MainCompanyEntity[]> {
    return await this.mainCompanyRepository
      .createQueryBuilder('mainCompany')
      .where({
        isDelete: false,
      })
      .andWhere('mainCompany.name IN (:...names)', {
        names,
      })
      .getMany();
  }

  async checkMainCompanyName(name: string, isAdd: boolean): Promise<boolean> {
    const checkByDB = await this.findByName(name);
    if (checkByDB && (isAdd || checkByDB?.name !== name)) {
      ResponseTools.fail('经营主体名称重复,请检查后重试!');
      return false;
    }
    return true;
  }

  async create(createCompany: MainCompanyDto): Promise<boolean> {
    await this.checkMainCompanyName(createCompany.name, true);

    const mainCompany = await this.mainCompanyRepository.save(createCompany);
    if (!mainCompany) {
      return false;
    }
    return true;
  }

  async createBatch(mainCompanyList: MainCompanyDto[]): Promise<boolean> {
    const mainCompany = await this.mainCompanyRepository
      .createQueryBuilder('mainCompany')
      .insert()
      .values(mainCompanyList)
      .execute();
    if (!mainCompany) {
      return false;
    }
    return true;
  }

  async details(id: string): Promise<MainCompanyEntity> {
    const mainCompany = await this.mainCompanyRepository
      .createQueryBuilder('mainCompany')
      .where({
        id,
      })
      .getOne();

    if (!mainCompany) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return mainCompany;
  }

  async editBasicInfo(editBasicInfo: MainCompanyDto): Promise<boolean> {
    const { id, ...info } = editBasicInfo;

    await this.checkMainCompanyName(info.name, false);

    const { affected } = await this.mainCompanyRepository.update(id, info);
    return affected === 1;
  }

  async getPageList(
    pageSearch: MainCompanyPageDto,
  ): Promise<IPageInterface<MainCompanyEntity>> {
    const { name } = pageSearch;
    const params = name
      ? {
          ...pageSearch,
          name: Like(`%${pageSearch?.name}%`),
        }
      : pageSearch;
    return await new PageService(this.mainCompanyRepository, params).fetch({
      leftJoinAndMapMany: [this.leftJoinVirtualShareholder],
      alias: 'mainCompany',
    });
  }
}
