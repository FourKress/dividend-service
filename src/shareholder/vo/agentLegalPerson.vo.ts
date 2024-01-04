import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderBaseVo } from './shareholderBase.vo';

export class AgentLegalPersonVo extends ShareholderBaseVo {
  constructor(shareholder: IShareholderItem) {
    super(shareholder);
    this.proxyStartTime = shareholder.proxyStartTime;
    this.shareholderRatio = shareholder.shareholderRatio;
  }

  readonly proxyStartTime: string;
  readonly shareholderRatio: number;
}
