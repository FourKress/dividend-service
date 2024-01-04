import { PageVo } from '../../common/vo/page.vo';
import { ShareholderGrantVo } from './shareholder-grant.vo';
import { ShareholderGrantEntity } from '../entity/shareholder-grant-entity';

export class StaffGrantDetailPageVo extends PageVo<ShareholderGrantVo> {
  constructor(staffGrant: PageVo<ShareholderGrantEntity>) {
    super(staffGrant);
    const { records } = staffGrant;
    this.records = records.map((d) => {
      return new ShareholderGrantVo(d);
    });
  }

  readonly records: ShareholderGrantVo[];
}
