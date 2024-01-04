import { IShareholderItem } from '../interface/shareholderItem';
import { ShareholderBaseVo } from './shareholderBase.vo';

export class VirtualShareholderVo extends ShareholderBaseVo {
  constructor(shareholder: IShareholderItem) {
    super(shareholder);
    this.discountBase = shareholder.discountBase;
    this.noDiscountBase = shareholder.noDiscountBase;
    this.authorizeTime = shareholder.authorizeTime;
    this.shareholderRatio = shareholder.shareholderRatio;
  }

  readonly discountBase: string;
  readonly noDiscountBase: string;
  readonly authorizeTime: string;
  readonly shareholderRatio: number;
}
