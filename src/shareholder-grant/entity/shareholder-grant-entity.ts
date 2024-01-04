import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';

import {
  ShareholderTypeEnum,
  ShareholderType2CnEnum,
  RegionEnum,
  Region2CnEnum,
} from '../../common/enum/';

@Entity('shareholder-grant')
export class ShareholderGrantEntity extends Base {
  @Column({ comment: '公司Id' })
  mainCompanyId: string;

  @Column({ comment: '公司名称' })
  mainCompanyName: string;

  @Column({
    type: 'enum',
    enum: ShareholderTypeEnum,
    transformer: EnumTransform(ShareholderType2CnEnum),
    comment: '分配类型',
  })
  shareholderType: ShareholderTypeEnum;

  @Column({ default: '', comment: '分配时间' })
  grantTime: string;

  @Column({ comment: '股东-员工Id' })
  staffId: string;

  @Column({ comment: '股东-员工姓名' })
  staffName: string;

  @Column({ comment: '股东-员工工号' })
  jobNo: string;

  @Column({ comment: '持股比例' })
  ratio: string;

  @Column({ comment: '股东Id' })
  shareholderId: string;

  @Column({
    type: 'enum',
    enum: RegionEnum,
    transformer: EnumTransform(Region2CnEnum),
    comment: '所属大区',
  })
  region: RegionEnum;

  @Column({ default: '', comment: '应分配金额' })
  awaitGrantAmount: string;

  @Column({ default: '', comment: '实分配金额' })
  realGrantAmount: string;

  @Column({ default: '', comment: '未分配金额' })
  unpaidGrantAmount: string;

  @Column({ default: '', comment: '可分配基数' })
  awaitGrantBase: string;

  @Column({ default: '', comment: '实际分配基数' })
  realGrantBase: string;
}
