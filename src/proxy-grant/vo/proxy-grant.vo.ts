import { ProxyGrantEntity } from '../entity/proxy-grant.entity';
import { ShareholderTypeEnum } from '../../common/enum';

export class ProxyGrantVo {
  constructor(proxyGrant: ProxyGrantEntity) {
    this.id = String(proxyGrant.id);
    this.companyId = proxyGrant.companyId;
    this.companyName = proxyGrant.companyName;
    this.shareholderType = proxyGrant.shareholderType;
    this.staffId = proxyGrant.staffId;
    this.staffName = proxyGrant.staffName;
    this.provideName = proxyGrant.provideName;
    this.proxyStartTime = proxyGrant.proxyStartTime;
    this.proxyEndTime = proxyGrant.proxyEndTime;
    this.holdMonth = proxyGrant.holdMonth;
    this.grantAmount = proxyGrant.grantAmount;
    this.grantTime = proxyGrant.grantTime;
    this.remark = proxyGrant.remark;
  }

  readonly id: string;
  readonly companyId: string;
  readonly companyName: string;
  readonly shareholderType: ShareholderTypeEnum;
  readonly staffId: string;
  readonly staffName: string;
  readonly provideName: string;
  readonly proxyStartTime: string;
  readonly proxyEndTime: string;
  readonly holdMonth: string;
  readonly grantAmount: string;
  readonly grantTime: string;
  readonly remark: string;
}
