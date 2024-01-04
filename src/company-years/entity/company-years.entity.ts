import { Entity, Column } from 'typeorm';

import { Base } from '../../common/entity/base.entity';

@Entity('company-years')
export class CompanyYearsEntity extends Base {
  @Column({ comment: '公司ID' })
  companyId: string;

  @Column({ comment: '年份' })
  years: string;

  @Column({ default: '', comment: '总入驻家数(单位:家)' })
  settleInQuantity: string;

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '总开票金额',
  })
  invoiceAmount: number;

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '总交易额',
  })
  transactionAmount: number;
}
