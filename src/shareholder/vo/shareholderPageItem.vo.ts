import { IShareholderPageItem } from '../interface/shareholderPageItem';
import { ShareholderTypeEnum } from '../../common/enum';

export class ShareholderPageItemVo {
  constructor(shareholder: IShareholderPageItem) {
    this.id = String(shareholder.id);
    this.companyId = shareholder.companyId;
    this.staffId = shareholder.staffId;
    this.securityDepositAmount = shareholder.securityDepositAmount;
    this.staffName = shareholder.staffName;
    this.jobNo = shareholder.jobNo;
    this.position = shareholder.position;
    this.rank = shareholder.rank;
    this.bankName = shareholder.bankName;
    this.account = shareholder.account;
    this.accountName = shareholder.accountName;
    this.shareholderType = shareholder.shareholderType;
    this.dividendRatio = shareholder.dividendRatio;
    this.shareholderRatio = shareholder.shareholderRatio;
  }

  readonly id: string;
  readonly companyId: string;
  readonly staffId: string;
  readonly securityDepositAmount: number;
  readonly staffName: string;
  readonly jobNo: string;
  readonly position: string;
  readonly rank: string;
  readonly bankName: string;
  readonly account: string;
  readonly accountName: string;
  readonly shareholderType: ShareholderTypeEnum;
  readonly dividendRatio: number;
  readonly shareholderRatio: number;
}
