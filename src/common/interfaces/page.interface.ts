export interface IPageInterface<T> {
  size: number;
  current: number;
  total: number;
  records: T[];
}
