import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';
import { ImportStatusEnum, ImportStatus2CnEnum } from '../../common/enum';

@Entity('import-records')
export class ImportRecordsEntity extends Base {
  @Column({ default: '', comment: '原始数据' })
  fileId: string;

  @Column({ type: 'text', default: '', comment: '原始数据' })
  rawData: string;

  @Column({ default: '', comment: '错误原因' })
  msg: string;

  @Column({ default: '' })
  templateCode: string;

  @Column({
    default: ImportStatusEnum.TRUE,
    type: 'enum',
    enum: ImportStatusEnum,
    transformer: EnumTransform(ImportStatus2CnEnum),
    comment: '导入状态',
  })
  importStatus: ImportStatusEnum;

  @Column({
    default: '',
    comment: '导入时间',
  })
  importTime: string;
}
