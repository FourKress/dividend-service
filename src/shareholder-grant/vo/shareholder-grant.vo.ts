import { RegionEnum, ShareholderTypeEnum } from '../../common/enum';
import { ShareholderGrantEntity } from '../entity/shareholder-grant-entity';

export class ShareholderGrantVo {
  constructor(shareholderGrant: ShareholderGrantEntity) {
    this.id = String(shareholderGrant.id);
    this.mainCompanyId = shareholderGrant.mainCompanyId;
    this.mainCompanyName = shareholderGrant.mainCompanyName;
    this.shareholderType = shareholderGrant.shareholderType;
    this.grantTime = shareholderGrant.grantTime;
    this.staffId = shareholderGrant.staffId;
    this.staffName = shareholderGrant.staffName;
    this.jobNo = shareholderGrant.jobNo;
    this.ratio = shareholderGrant.ratio;
    this.shareholderId = shareholderGrant.shareholderId;
    this.region = shareholderGrant.region;

    this.awaitGrantAmount = shareholderGrant.awaitGrantAmount;
    this.realGrantAmount = shareholderGrant.realGrantAmount;
    this.unpaidGrantAmount = shareholderGrant.unpaidGrantAmount;

    this.awaitGrantBase = shareholderGrant.awaitGrantBase;
    this.realGrantBase = shareholderGrant.realGrantBase;
  }

  readonly id: string;
  readonly mainCompanyId: string;
  readonly mainCompanyName: string;
  readonly shareholderType: ShareholderTypeEnum;
  readonly grantTime: string;
  readonly staffId: string;
  readonly staffName: string;
  readonly jobNo: string;
  readonly ratio: string;
  readonly shareholderId: string;
  readonly region: RegionEnum;

  readonly awaitGrantAmount: string;
  readonly realGrantAmount: string;
  readonly unpaidGrantAmount: string;

  readonly awaitGrantBase: string;
  readonly realGrantBase: string;
}
