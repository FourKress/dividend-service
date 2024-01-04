import {
  BooleanFlagEnum,
  GrantStatusEnum,
  RegionEnum,
} from '../../common/enum';
import { PrimitiveGrantEntity } from '../entity/primitive-grant.entity';

export class PrimitiveGrantVo {
  constructor(primitiveGrant: PrimitiveGrantEntity) {
    this.id = String(primitiveGrant.id);
    this.mainCompanyId = primitiveGrant.mainCompanyId;
    this.mainCompanyName = primitiveGrant.mainCompanyName;
    this.companyBody = primitiveGrant.companyBody;
    this.region = primitiveGrant.region;

    this.yearUnpaidGrantAmount = primitiveGrant.yearUnpaidGrantAmount;
    this.yearAmount = primitiveGrant.yearAmount;
    this.allocatedAmount = primitiveGrant.allocatedAmount;

    this.awaitGrantBase = primitiveGrant.awaitGrantBase;
    this.realGrantBase = primitiveGrant.realGrantBase;
    this.unpaidGrantBase = primitiveGrant.unpaidGrantBase;

    this.grantStatus = primitiveGrant.grantStatus;
    this.remark = primitiveGrant.remark;
    this.grantTime = primitiveGrant.grantTime;
    this.importTime = primitiveGrant.importTime;
  }

  readonly id: string;
  readonly mainCompanyId: string;
  readonly mainCompanyName: string;
  readonly companyBody: string;
  readonly region: RegionEnum;

  readonly yearUnpaidGrantAmount: number;
  readonly yearAmount: number;
  readonly allocatedAmount: number;

  readonly awaitGrantBase: number;
  readonly realGrantBase: number;
  readonly unpaidGrantBase: number;

  readonly grantStatus: GrantStatusEnum;
  readonly remark: string;
  readonly grantTime: string;
  readonly importTime: string;
}
