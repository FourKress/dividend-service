import { IShareholderItem } from '../interface/shareholderItem';
import { StaffEntity } from '../../staff/entity/staff.entity';

export interface IOfficeRecordsItem {
  readonly staff: StaffEntity;
  readonly proxyStartTime: string;
  readonly proxyEndTime: string;
  readonly holdMonth: number;
}

export class OfficeRecordsVo {
  constructor(records: IShareholderItem[]) {
    this.records = records.map((d) => {
      const { staff, proxyStartTime, proxyEndTime, holdMonth } = d;

      return {
        staff,
        proxyStartTime,
        proxyEndTime,
        holdMonth,
      };
    });
  }

  readonly records: IOfficeRecordsItem[];
}
