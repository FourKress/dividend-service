import { StaffEntity } from '../entity/staff.entity';

export interface IStaffItem {
  value: string;
  label: string;
}

export class StaffListVo {
  constructor(companyList: StaffEntity[]) {
    this.records = companyList.map((d) => {
      const { id, name } = d;
      return {
        value: String(id),
        label: name,
      };
    });
  }
  readonly records: IStaffItem[];
}
