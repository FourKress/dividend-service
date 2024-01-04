import { PageVo } from '../../common/vo/page.vo';
import { ShareholderPageItemVo } from './shareholderPageItem.vo';
import { IShareholderPageItem } from '../interface/shareholderPageItem';

export class ShareholderPageVo extends PageVo<ShareholderPageItemVo> {
  constructor(shareholderPage: PageVo<IShareholderPageItem>) {
    super(shareholderPage);
    const { records } = shareholderPage;
    this.records = records.map((d) => {
      return new ShareholderPageItemVo(d);
    });
  }

  readonly records: ShareholderPageItemVo[];
}
