import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderTypeEnum } from '../../common/enum';

export class ShareholderBaseVo {
  constructor(shareholder: IShareholderItem) {
    this.id = String(shareholder.id);
    this.companyId = shareholder.companyId;
    this.staffId = shareholder.staffId;
    this.shareholderType = shareholder.shareholderType;
    this.isDelete = shareholder.isDelete;
  }
  readonly id: string;
  readonly companyId: string;
  readonly staffId: string;
  readonly shareholderType: ShareholderTypeEnum;
  readonly isDelete: boolean;
}
