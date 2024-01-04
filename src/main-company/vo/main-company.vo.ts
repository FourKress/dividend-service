import { Timestamp } from 'typeorm';
import {
  BooleanFlagEnum,
  CompanyStatusEnum,
  RegionEnum,
} from '../../common/enum';
import { MainCompanyEntity } from '../entity/main-company.entity';

export class MainCompanyVo {
  constructor(mainCompany: MainCompanyEntity) {
    this.id = String(mainCompany.id);
    this.name = mainCompany.name;
    this.companyBody = mainCompany.companyBody;
    this.status = mainCompany.status;

    this.region = mainCompany.region;
    this.isNew = mainCompany.isNew;
    this.isSharesTransfer = mainCompany.isSharesTransfer;
    this.securityDepositAmount = mainCompany.securityDepositAmount;
    this.updateTime = mainCompany.updateTime;
  }
  readonly id: string;
  readonly name: string;
  readonly companyBody: string;
  readonly status: CompanyStatusEnum;

  readonly region: RegionEnum;
  readonly isNew: BooleanFlagEnum;
  readonly isSharesTransfer: BooleanFlagEnum;
  readonly securityDepositAmount: number;
  readonly updateTime: Timestamp;
}
