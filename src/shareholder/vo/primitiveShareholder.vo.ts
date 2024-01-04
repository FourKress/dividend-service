import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderBaseVo } from './shareholderBase.vo';

export class PrimitiveShareholderVo extends ShareholderBaseVo {
  constructor(shareholder: IShareholderItem) {
    super(shareholder);
    this.dividendRatio = shareholder.dividendRatio;
  }

  readonly dividendRatio: number;
}
