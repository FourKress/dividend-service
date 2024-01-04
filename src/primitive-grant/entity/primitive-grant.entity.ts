import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';
import {
  Region2CnEnum,
  RegionEnum,
  GrantStatusEnum,
  GrantStatus2CnEnum,
} from '../../common/enum';

@Entity('primitive-grant')
export class PrimitiveGrantEntity extends Base {
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

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '期初未分配金额',
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
    comment: '已分配金额',
  })
  allocatedAmount: number;

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
