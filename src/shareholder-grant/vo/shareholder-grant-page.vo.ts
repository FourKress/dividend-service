import { PageVo } from '../../common/vo/page.vo';
import { ShareholderGrantVo } from './shareholder-grant.vo';
import { ShareholderGrantEntity } from '../entity/shareholder-grant-entity';

export class ShareholderGrantPageVo extends PageVo<ShareholderGrantVo> {
  constructor(shareholderGrant: PageVo<ShareholderGrantEntity>) {
    super(shareholderGrant);
    const { records } = shareholderGrant;
    this.records = records.map((d) => {
      return new ShareholderGrantVo(d);
    });
  }

  readonly records: ShareholderGrantVo[];
}
