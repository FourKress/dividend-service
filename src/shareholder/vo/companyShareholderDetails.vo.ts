import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderTypeEnum } from '../../common/enum';
import { AgentLegalPersonVo } from './agentLegalPerson.vo';
import { HoldingShareholderVo } from './holdingShareholder.vo';
import { VirtualShareholderVo } from './virtualShareholder.vo';
import { PrimitiveShareholderVo } from './primitiveShareholder.vo';

export class CompanyShareholderDetailsVo {
  constructor(companyShareholderDetails: IShareholderItem[]) {
    let agentLegalPerson;
    let holdingShareholder;
    const virtualShareholder = [];
    const primitiveShareholder = [];

    companyShareholderDetails.forEach((d) => {
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
        case ShareholderTypeEnum.VIRTUAL_SHAREHOLDER:
          virtualShareholder.push(new VirtualShareholderVo(d));
          break;
        case ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER:
          primitiveShareholder.push(new PrimitiveShareholderVo(d));
          break;
      }
    });
    this.agentLegalPerson = agentLegalPerson;
    this.holdingShareholder = holdingShareholder;
    this.virtualShareholder = virtualShareholder;
    this.primitiveShareholder = primitiveShareholder;
  }

  readonly agentLegalPerson?: AgentLegalPersonVo;
  readonly holdingShareholder?: HoldingShareholderVo;
  readonly virtualShareholder?: VirtualShareholderVo[];
  readonly primitiveShareholder?: PrimitiveShareholderVo[];
}
