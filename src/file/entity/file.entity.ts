import { Entity, Column } from 'typeorm';

import { Base, EnumTransform } from '../../common/entity/base.entity';
import { ImportStatusEnum, ImportStatus2CnEnum } from '../../common/enum';

@Entity('files')
export class FileEntity extends Base {
  @Column()
  mimetype: string;

  @Column()
  name: string;

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
    default: null,
    comment: '导入时间',
  })
  importTime: string;
}
