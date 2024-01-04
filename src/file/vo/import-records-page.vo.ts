import { PageVo } from '../../common/vo/page.vo';
import { FileEntity } from '../entity/file.entity';

export class ImportRecordsPageVo extends PageVo<FileEntity> {
  constructor(importRecords: PageVo<FileEntity>) {
    super(importRecords);
    const { records } = importRecords;
    this.records = records;
  }

  readonly records: FileEntity[];
}
