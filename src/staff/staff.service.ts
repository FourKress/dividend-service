import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';

import { StaffEntity } from './entity/staff.entity';
import { StaffDto, StaffPageDto } from './dto';
import { ResponseTools } from '../common/utils/response-tools';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { ILeftJoin } from '../common/interfaces/leftJoin.interface';
import { IStaffPageItem } from './interface/staff.interface';
import { ShareholderTypeEnum } from '../common/enum';

@Injectable()
export class StaffService {
  @InjectRepository(StaffEntity)
  private readonly staffRepository: Repository<StaffEntity>;

  private readonly leftJoinShareholder: ILeftJoin = {
    mapToProperty: 'staff.shareholder',
    property: 'shareholder',
    alias: 'shareholder',
    condition: `staff.id = shareholder.staffId AND shareholder.isDelete = false`,
  };

  private readonly leftJoinCompany: ILeftJoin = {
    mapToProperty: 'staff.company',
    property: 'company',
    alias: 'company',
    condition: `shareholder.companyId = company.id AND company.isDelete = false AND shareholder.shareholderType IN ('${ShareholderTypeEnum.AGENT_LEGAL_PERSON}', '${ShareholderTypeEnum.HOLDING_SHAREHOLDER}')`,
  };

  private readonly leftJoinMainCompany: ILeftJoin = {
    mapToProperty: 'staff.mainCompany',
    property: 'main-company',
    alias: 'mainCompany',
    condition: `shareholder.companyId = mainCompany.id AND mainCompany.isDelete = false AND shareholder.shareholderType IN ('${ShareholderTypeEnum.VIRTUAL_SHAREHOLDER}', '${ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER}')`,
  };

  private readonly leftJoinFlowDetails: ILeftJoin = {
    mapToProperty: 'staff.flowDetailsList',
    property: 'flow-details',
    alias: 'flowDetails',
    condition: `staff.name = flowDetails.payer AND staff.jobNo = flowDetails.jobNo AND shareholder.shareholderType = ('${ShareholderTypeEnum.VIRTUAL_SHAREHOLDER}') `,
  };

  async findByName(name: string): Promise<StaffEntity> {
    return this.staffRepository.findOneBy({ name, isDelete: false });
  }

  async checkStaffName(name: string): Promise<boolean> {
    const checkByDB = await this.findByName(name);
    if (checkByDB) {
      ResponseTools.fail('员工名称重复,请检查后重试!');
      return false;
    }
    return true;
  }

  async create(createStaff: StaffDto): Promise<boolean> {
    const staff = await this.staffRepository.save(createStaff);
    if (!staff) {
      return false;
    }
    return true;
  }

  async createBatch(createStaffList: StaffDto[]): Promise<boolean> {
    const staffList = await this.staffRepository
      .createQueryBuilder('staff')
      .insert()
      .values(createStaffList)
      .execute();

    if (!staffList) {
      return false;
    }
    return true;
  }

  async findByNameAndJobNoAll(
    staffList: StaffEntity[],
  ): Promise<StaffEntity[]> {
    const query = this.staffRepository.createQueryBuilder('staff');
    staffList.forEach((staff) => {
      const { name, jobNo } = staff;
      query.orWhere({
        name,
        jobNo,
        isDelete: false,
      });
    });
    return await query.getMany();
  }

  async edit(editStaff: StaffDto): Promise<boolean> {
    const { id, ...info } = editStaff;
    const { affected } = await this.staffRepository.update(id, {
      ...info,
    });
    return affected === 1;
  }

  async details(id: string): Promise<StaffEntity> {
    const staff = await this.staffRepository.findOneBy({ id });
    if (!staff) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return staff;
  }

  async getPageList(
    pageSearch: StaffPageDto,
  ): Promise<IPageInterface<IStaffPageItem>> {
    const { name, ...data } = pageSearch;
    const params = name
      ? {
          ...data,
          name: Like(`%${pageSearch?.name}%`),
        }
      : data;
    return await new PageService(this.staffRepository, params).fetch({
      alias: 'staff',
      leftJoinAndMapMany: [
        this.leftJoinShareholder,
        this.leftJoinCompany,
        this.leftJoinFlowDetails,
        this.leftJoinMainCompany,
      ],
    });
  }

  async getList(): Promise<StaffEntity[]> {
    return this.staffRepository.findBy({ isDelete: false });
  }
}
