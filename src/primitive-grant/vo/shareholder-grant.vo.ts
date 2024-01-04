import { ShareholderGrantItemVo } from './shareholder-grant-item.vo';
import { IShareholderGrantItem } from '../interface/IShareholder-grant-item';

export class ShareholderGrantVo {
  constructor(grantList: IShareholderGrantItem[]) {
    this.records = grantList.map((d) => {
      return new ShareholderGrantItemVo(d);
    });
  }

  readonly records: ShareholderGrantItemVo[];
}
