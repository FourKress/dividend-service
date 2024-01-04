import { Entity, Column } from 'typeorm';

import { Base } from '../../common/entity/base.entity';

@Entity('protocol')
export class ProtocolEntity extends Base {
  @Column({ comment: '公司ID' })
  companyId: string;

  @Column({ comment: '签订时间' })
  signTime: string;

  @Column({ comment: '结束时间' })
  endTime: string;

  @Column({ default: '', comment: '协议甲方' })
  partyA: string;

  @Column({ default: '', comment: '协议乙方' })
  partyB: string;

  @Column({ default: '', comment: '协议类型' })
  type: string;

  @Column({ default: '', comment: '协议附件' })
  fileId: string;
}
