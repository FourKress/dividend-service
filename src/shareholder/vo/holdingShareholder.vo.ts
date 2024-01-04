import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderBaseVo } from './shareholderBase.vo';

export class HoldingShareholderVo extends ShareholderBaseVo {
  constructor(shareholder: IShareholderItem) {
    super(shareholder);
    this.proxyStartTime = shareholder.proxyStartTime;
    this.provideName = shareholder.provideName;
    this.shareholderRatio = shareholder.shareholderRatio;
  }

  readonly proxyStartTime: string;
  readonly provideName: string;
  readonly shareholderRatio: number;
}
