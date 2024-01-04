import { SelectQueryBuilder } from 'typeorm';
import { ILeftJoin } from './leftJoin.interface';

export interface IQueryConfig<T> {
  queryBuilder?: SelectQueryBuilder<T>;
  baseQuery?: boolean;
  leftJoinAndMapOne?: ILeftJoin[];
  leftJoinAndMapMany?: ILeftJoin[];
  alias?: string;
}
