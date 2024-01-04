import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';

import {
  ShareholderTypeEnum,
  ShareholderType2CnEnum,
} from '../../common/enum/';

@Entity('proxy-grant')
export class ProxyGrantEntity extends Base {
  @Column({ comment: '公司Id' })
  companyId: string;

  @Column({ comment: '分配公司' })
  companyName: string;

  @Column({
    type: 'enum',
    enum: ShareholderTypeEnum,
    transformer: EnumTransform(ShareholderType2CnEnum),
    comment: '分配类型',
  })
  shareholderType: ShareholderTypeEnum;

  @Column({ comment: '员工Id' })
  staffId: string;

  @Column({ comment: '分配人' })
  staffName: string;

  @Column({ comment: '股东Id' })
  shareholderId: string;

  @Column({ default: '', comment: '提供人' })
  provideName: string;

  @Column({ default: '', comment: '代理开始时间' })
  proxyStartTime: string;

  @Column({ default: '', comment: '代理开始时间' })
  proxyEndTime: string;

  @Column({ default: '', comment: '代持时长' })
  holdMonth: string;

  @Column({ default: '', comment: '代持费用' })
  grantAmount: string;

  @Column({ default: '', comment: '分配时间' })
  grantTime: string;

  @Column({ default: '', comment: '备注' })
  remark: string;
}
