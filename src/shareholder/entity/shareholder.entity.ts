import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';
import { ShareholderTypeEnum, ShareholderType2CnEnum } from '../../common/enum';

@Entity('shareholder')
export class ShareholderEntity extends Base {
  @Column({ comment: '公司ID' })
  companyId: string;

  @Column({ comment: '员工ID' })
  staffId: string;

  @Column({
    type: 'enum',
    enum: ShareholderTypeEnum,
    transformer: EnumTransform(ShareholderType2CnEnum),
    comment: '股东类型',
  })
  shareholderType: ShareholderTypeEnum;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '股份/持股',
  })
  shareholderRatio: number;

  @Column('decimal', {
    precision: 10,
    scale: 2,
    comment: '分红占比',
  })
  dividendRatio: number;

  @Column({ default: '', comment: '代理开始时间' })
  proxyStartTime: string;

  @Column({ default: '', comment: '代理开始时间' })
  proxyEndTime: string;

  @Column({ default: '', comment: '提供人' })
  provideName: string;

  @Column({ default: '', comment: '打折基数' })
  discountBase: string;

  @Column({ default: '', comment: '不打折基数' })
  noDiscountBase: string;

  @Column({ default: '', comment: '授权时间' })
  authorizeTime: string;
}
