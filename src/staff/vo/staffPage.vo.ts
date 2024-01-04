import { PageVo } from '../../common/vo/page.vo';
import { StaffPageItemVo } from './staffPageItem.vo';
import { IStaffPageItem } from '../interface/staff.interface';

export class StaffPageVo extends PageVo<StaffPageItemVo> {
  constructor(staffPage: PageVo<IStaffPageItem>) {
    super(staffPage);
    const { records } = staffPage;
    this.records = records.map((d) => {
      return new StaffPageItemVo(d);
    });
  }

  readonly records: StaffPageItemVo[];
}
