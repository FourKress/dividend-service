import { IPageInterface } from '../interfaces/page.interface';

export class PageVo<T> {
  constructor(pageData: IPageInterface<T>) {
    const { size, current, total, records } = pageData;
    this.size = size;
    this.current = current;
    this.total = total;
    this.records = records;
  }
  readonly size: number;
  readonly current: number;
  readonly total: number;
  readonly records: T[];
}
