import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';

import {
  CompanyStatusEnum,
  CompanyStatus2CnEnum,
  RegionEnum,
  Region2CnEnum,
  BooleanFlagEnum,
  BooleanFlag2CnEnum,
} from '../../common/enum/';

@Entity('main-company')
export class MainCompanyEntity extends Base {
  @Column({ comment: '经营主体名称' })
  name: string;

  @Column({ comment: '主体公司' })
  companyBody: string;

  @Column({
    type: 'enum',
    enum: CompanyStatusEnum,
    transformer: EnumTransform(CompanyStatus2CnEnum),
    comment: '经营主体状态',
  })
  status: CompanyStatusEnum;

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

  @Column('decimal', {
    default: '0.00',
    precision: 10,
    scale: 2,
    comment: '保证金',
  })
  securityDepositAmount: number;
}
