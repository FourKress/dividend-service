import { PageVo } from '../../common/vo/page.vo';
import { StaffGrantVo } from './staff-grant.vo';
import { IStaffGrantItem } from '../interface/staffGrantItem';

export class StaffGrantPageVo extends PageVo<StaffGrantVo> {
  constructor(staffGrant: PageVo<IStaffGrantItem>) {
    super(staffGrant);
    const { records } = staffGrant;
    this.records = records.map((d) => {
      return new StaffGrantVo(d);
    });
  }

  readonly records: StaffGrantVo[];
}
