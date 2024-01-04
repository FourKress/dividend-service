import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';

import { BooleanFlagEnum, BooleanFlag2CnEnum } from '../../common/enum';

@Entity('company-attribute')
export class CompanyAttributeEntity extends Base {
  @Column({ nullable: false, comment: '公司属性' })
  attribute: string;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '代持股东费用(单位:万/家/年)',
  })
  holdShareholderFeeAmount: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    nullable: false,
    comment: '代理法人费用(单位:万/家/年)',
  })
  actingLegalPersonFeeAmount: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: BooleanFlagEnum,
    transformer: EnumTransform(BooleanFlag2CnEnum),
    comment: '是否考核',
  })
  checkFlag: BooleanFlagEnum;

  @Column({ default: '', comment: '入驻数量(单位:家)' })
  settleInQuantity: string;

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '开票额',
  })
  invoiceAmount: number;

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '交易额',
  })
  transactionAmount: number;
}
