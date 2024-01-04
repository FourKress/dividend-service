import { Entity, Column } from 'typeorm';

import { Base } from '../../common/entity/base.entity';

@Entity('flow-details')
export class FlowDetailsEntity extends Base {
  @Column({ comment: '付款人' })
  payer: string;

  @Column({ comment: '工号' })
  jobNo: string;

  @Column({ comment: '付款日期' })
  payDate: string;

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '付款金额',
  })
  amount: number;

  @Column({ comment: '收款账户' })
  bankName: string;
}
