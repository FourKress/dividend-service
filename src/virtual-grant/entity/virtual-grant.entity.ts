import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';
import {
  BooleanFlag2CnEnum,
  BooleanFlagEnum,
  Region2CnEnum,
  RegionEnum,
  GrantStatusEnum,
  GrantStatus2CnEnum,
} from '../../common/enum';

@Entity('virtual-grant')
export class VirtualGrantEntity extends Base {
  @Column({ comment: '经营主体ID' })
  mainCompanyId: string;

  @Column({ comment: '经营主体名称' })
  mainCompanyName: string;

  @Column({ comment: '主体公司名称' })
  companyBody: string;

  @Column({
    type: 'enum',
    enum: RegionEnum,
    transformer: EnumTransform(Region2CnEnum),
    comment: '所属大区',
  })
  region: RegionEnum;

  @Column({
    type: 'enum',
    enum: BooleanFlagEnum,
    transformer: EnumTransform(BooleanFlag2CnEnum),
    comment: '是否新开园',
  })
  isNew: BooleanFlagEnum;

  @Column({
    type: 'enum',
    enum: BooleanFlagEnum,
    transformer: EnumTransform(BooleanFlag2CnEnum),
    comment: '是否做股转',
  })
  isSharesTransfer: BooleanFlagEnum;

  @Column({ default: '', comment: '分配年份' })
  grantYears: string;

  @Column({ default: '', comment: '授予时间' })
  authorizeTime: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '年初剩余分配金额',
  })
  yearUnpaidGrantAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '当年金额',
  })
  yearAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '不打折基数',
  })
  noDiscountBase: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '打折基数',
  })
  discountBase: number;

  // 需要判断是否做股转, 是: 不打折基数, 否: 打折基数
  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '应分配基数',
  })
  awaitGrantBase: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '实际分配基数',
  })
  realGrantBase: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '剩余分配基数',
  })
  unpaidGrantBase: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '应分配金额',
  })
  awaitGrantAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '实分配金额',
  })
  realGrantAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '未分配金额',
  })
  unpaidGrantAmount: number;

  @Column({
    type: 'enum',
    enum: GrantStatusEnum,
    transformer: EnumTransform(GrantStatus2CnEnum),
    comment: '分配状态',
  })
  grantStatus: GrantStatusEnum;

  @Column({ default: '', comment: '备注' })
  remark: string;

  @Column({ default: '', comment: '分配时间' })
  grantTime: string;

  @Column({ default: '', comment: '导入时间' })
  importTime: string;
}
