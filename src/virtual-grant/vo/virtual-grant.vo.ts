import {
  BooleanFlagEnum,
  GrantStatusEnum,
  RegionEnum,
} from '../../common/enum';
import { VirtualGrantEntity } from '../entity/virtual-grant.entity';

export class VirtualGrantVo {
  constructor(virtualGrant: VirtualGrantEntity) {
    this.id = String(virtualGrant.id);
    this.mainCompanyId = virtualGrant.mainCompanyId;
    this.mainCompanyName = virtualGrant.mainCompanyName;
    this.companyBody = virtualGrant.companyBody;
    this.region = virtualGrant.region;
    this.isNew = virtualGrant.isNew;
    this.isSharesTransfer = virtualGrant.isSharesTransfer;

    this.grantYears = virtualGrant.grantYears;
    this.authorizeTime = virtualGrant.authorizeTime;
    this.yearUnpaidGrantAmount = virtualGrant.yearUnpaidGrantAmount;
    this.yearAmount = virtualGrant.yearAmount;

    this.noDiscountBase = virtualGrant.noDiscountBase;
    this.discountBase = virtualGrant.discountBase;

    this.awaitGrantBase = virtualGrant.awaitGrantBase;
    this.realGrantBase = virtualGrant.realGrantBase;
    this.unpaidGrantBase = virtualGrant.unpaidGrantBase;

    this.awaitGrantAmount = virtualGrant.awaitGrantAmount;
    this.realGrantAmount = virtualGrant.realGrantAmount;
    this.unpaidGrantAmount = virtualGrant.unpaidGrantAmount;

    this.grantStatus = virtualGrant.grantStatus;
    this.remark = virtualGrant.remark;
    this.grantTime = virtualGrant.grantTime;
    this.importTime = virtualGrant.importTime;
  }

  readonly id: string;
  readonly mainCompanyId: string;
  readonly mainCompanyName: string;
  readonly companyBody: string;
  readonly region: RegionEnum;
  readonly isNew: BooleanFlagEnum;
  readonly isSharesTransfer: BooleanFlagEnum;

  readonly grantYears: string;
  readonly authorizeTime: string;
  readonly yearUnpaidGrantAmount: number;
  readonly yearAmount: number;

  readonly noDiscountBase: number;
  readonly discountBase: number;

  readonly awaitGrantBase: number;
  readonly realGrantBase: number;
  readonly unpaidGrantBase: number;

  readonly awaitGrantAmount: number;
  readonly realGrantAmount: number;
  readonly unpaidGrantAmount: number;

  readonly grantStatus: GrantStatusEnum;
  readonly remark: string;
  readonly grantTime: string;
  readonly importTime: string;
}
