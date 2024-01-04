import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';

import {
  CompanyStatusEnum,
  CompanyStatus2CnEnum,
  RegionEnum,
  Region2CnEnum,
} from '../../common/enum/';

@Entity('company')
export class CompanyEntity extends Base {
  @Column({ comment: '公司名称' })
  name: string;

  @Column({
    type: 'enum',
    enum: CompanyStatusEnum,
    transformer: EnumTransform(CompanyStatus2CnEnum),
    comment: '公司状态',
  })
  status: CompanyStatusEnum;

  @Column({ comment: '公司属性ID' })
  attributeId: string;

  @Column({
    type: 'enum',
    enum: RegionEnum,
    transformer: EnumTransform(Region2CnEnum),
    comment: '所属大区',
  })
  region: RegionEnum;

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '认缴资本',
  })
  subscriberAmount: number;

  @Column({ default: '', comment: '营业执照时间' })
  businessLicenseTime: string;

  @Column({ default: '', comment: '注册地址' })
  registeredAddress: string;

  @Column({ default: '', comment: '注销时间' })
  writeOffTime: string;

  @Column({ default: '', comment: '账户名称' })
  accountName: string;

  @Column({ default: '', comment: '账号号码' })
  accountNumber: string;

  @Column({ default: '', comment: '开户行' })
  accountBank: string;

  @Column({ default: '', comment: '税号' })
  taxNumber: string;

  @Column({ default: '', comment: '电话' })
  telephone: string;

  @Column({ default: '', comment: '营业执照附件ID' })
  businessLicenseLegalFileId: string;
}
