import { PageVo } from '../../common/vo/page.vo';
import { ShareholderRecordsItemVo } from './shareholderRecordsItem.vo';
import { IShareholderRecordsItem } from '../interface/shareholderRecordsItem';

export class ShareholderRecordsVo extends PageVo<ShareholderRecordsItemVo> {
  constructor(shareholderRecords: PageVo<IShareholderRecordsItem>) {
    super(shareholderRecords);
    const { records } = shareholderRecords;
    this.records = records.map((d) => {
      return new ShareholderRecordsItemVo(d);
    });
  }

  readonly records: ShareholderRecordsItemVo[];
}
