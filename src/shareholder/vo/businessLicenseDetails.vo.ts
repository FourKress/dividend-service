import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderTypeEnum } from '../../common/enum';
import { ShareholderVo } from './shareholder.vo';

class AgentLegalPersonVo extends ShareholderVo {
  constructor(shareholder: IShareholderItem) {
    super(shareholder);
    this.proxyStartTime = shareholder.proxyStartTime;
    this.shareholderRatio = shareholder.shareholderRatio;
  }

  readonly proxyStartTime: string;
  readonly shareholderRatio: number;
}

class HoldingShareholderVo extends ShareholderVo {
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

export class BusinessLicenseDetailsVo {
  constructor(businessLicenseDetails: IShareholderItem[]) {
    let agentLegalPerson;
    let holdingShareholder;

    businessLicenseDetails.forEach((d) => {
      const { shareholderType } = d;
      const value = shareholderType['value'] as number;
      d.shareholderType = value;
      switch (value) {
        case ShareholderTypeEnum.AGENT_LEGAL_PERSON:
          agentLegalPerson = new AgentLegalPersonVo(d);
          break;
        case ShareholderTypeEnum.HOLDING_SHAREHOLDER:
          holdingShareholder = new HoldingShareholderVo(d);
          break;
      }
    });
    this.agentLegalPerson = agentLegalPerson;
    this.holdingShareholder = holdingShareholder;
  }

  readonly agentLegalPerson?: AgentLegalPersonVo;
  readonly holdingShareholder?: HoldingShareholderVo;
}
