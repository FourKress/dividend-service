import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';
import {
  Region2CnEnum,
  RegionEnum,
  EmployeeAttributeEnum,
  EmployeeAttribute2CnEnum,
} from '../../common/enum';

@Entity('staff')
export class StaffEntity extends Base {
  @Column({ comment: '员工姓名' })
  name: string;

  @Column({ default: '', comment: '工号' })
  jobNo: string;

  @Column({ default: '', comment: '职位' })
  position: string;

  @Column({ default: '', comment: '职级' })
  rank: string;

  @Column({
    type: 'enum',
    default: null,
    enum: EmployeeAttributeEnum,
    transformer: EnumTransform(EmployeeAttribute2CnEnum),
    comment: '属性',
  })
  employeeAttribute: EmployeeAttributeEnum;

  @Column({
    type: 'enum',
    default: null,
    enum: RegionEnum,
    transformer: EnumTransform(Region2CnEnum),
    comment: '所在大区',
  })
  region: RegionEnum;

  @Column({ default: '', comment: '所在公司' })
  companyName: string;

  @Column({ default: '', comment: '身份证号码' })
  idCardNo: string;

  @Column({ default: '', comment: '年龄' })
  age: string;

  @Column({ default: '', comment: '电话' })
  phoneNum: string;

  @Column({ default: '', comment: '地址' })
  address: string;

  @Column({ default: '', comment: '身份证正面' })
  idCardFrontFileId: string;

  @Column({ default: '', comment: '身份证反面' })
  idCardBackFileId: string;

  @Column({ default: '', comment: '收款银行' })
  bankName: string;

  @Column({ default: '', comment: '收款账户' })
  accountName: string;

  @Column({ default: '', comment: '收款账号' })
  account: string;
}
