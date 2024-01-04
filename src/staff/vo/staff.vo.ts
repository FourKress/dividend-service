import { StaffEntity } from '../entity/staff.entity';
import { EmployeeAttributeEnum, RegionEnum } from '../../common/enum';

export class StaffVo {
  constructor(staff: StaffEntity) {
    this.id = String(staff.id);
    this.name = staff.name;
    this.jobNo = staff.jobNo;
    this.position = staff.position;
    this.rank = staff.rank;
    this.employeeAttribute = staff.employeeAttribute;
    this.region = staff.region;

    this.companyName = staff.companyName;
    this.idCardNo = staff.idCardNo;
    this.age = staff.age;
    this.address = staff.address;
    this.phoneNum = staff.phoneNum;
    this.idCardFrontFileId = staff.idCardFrontFileId;
    this.idCardBackFileId = staff.idCardBackFileId;
    this.bankName = staff.bankName;
    this.accountName = staff.accountName;
    this.account = staff.account;
  }
  readonly id: string;
  readonly name: string;
  readonly jobNo: string;
  readonly position: string;
  readonly rank: string;
  readonly employeeAttribute: EmployeeAttributeEnum;
  readonly region: RegionEnum;
  readonly companyName: string;
  readonly idCardNo: string;
  readonly age: string;
  readonly address: string;
  readonly phoneNum: string;
  readonly idCardFrontFileId: string;
  readonly idCardBackFileId: string;
  readonly bankName: string;
  readonly accountName: string;
  readonly account: string;
}
