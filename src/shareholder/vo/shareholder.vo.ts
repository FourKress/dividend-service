import { IShareholderItem } from '../interface/shareholderItem';
import { StaffEntity } from '../../staff/entity/staff.entity';
import { ShareholderBaseVo } from './shareholderBase.vo';

export class ShareholderVo extends ShareholderBaseVo {
  constructor(shareholder: IShareholderItem) {
    super(shareholder);
    this.staff = shareholder.staff;
    this.proxyStartTime = shareholder.proxyStartTime;
    this.proxyEndTime = shareholder.proxyEndTime;
    this.provideName = shareholder.provideName;
    this.authorizeTime = shareholder.authorizeTime;
  }
  readonly staff?: StaffEntity;
  readonly proxyStartTime?: string;
  readonly proxyEndTime?: string;
  readonly provideName?: string;
  readonly authorizeTime?: string;
}
