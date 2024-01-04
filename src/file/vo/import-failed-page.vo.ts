import { PageVo } from '../../common/vo/page.vo';
import { ImportRecordsEntity } from '../entity/import-records.entity';

export class ImportFailedPageVo extends PageVo<ImportRecordsEntity> {
  constructor(importFailed: PageVo<ImportRecordsEntity>) {
    super(importFailed);
    const { records } = importFailed;
    this.records = records;
  }

  readonly records: ImportRecordsEntity[];
}
