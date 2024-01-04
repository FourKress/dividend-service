import { Repository } from 'typeorm';
import { PageDto } from '../dto/page.dto';
import { IQueryConfig } from '../interfaces/queryConfig';

export class PageService<T> {
  constructor(repository: Repository<T>, pageSearch: PageDto) {
    this.repository = repository;
    this.pageSearch = pageSearch;
  }

  private readonly repository: Repository<T>;
  private readonly pageSearch: PageDto;

  async fetch(queryConfig?: IQueryConfig<T>) {
    const {
      queryBuilder,
      baseQuery = true,
      leftJoinAndMapMany,
      leftJoinAndMapOne,
      alias,
    } = queryConfig;

    const { size, current, ...data } = this.pageSearch;

    let query;
    if (queryBuilder) {
      query = queryBuilder;
    } else {
      query = await this.repository.createQueryBuilder(alias);
    }

    if (leftJoinAndMapOne?.length) {
      leftJoinAndMapOne.forEach((d) => {
        query.leftJoinAndMapOne(
          d.mapToProperty,
          d.property,
          d.alias,
          d.condition,
        );
      });
    }

    if (leftJoinAndMapMany?.length) {
      leftJoinAndMapMany.forEach((d) => {
        query.leftJoinAndMapMany(
          d.mapToProperty,
          d.property,
          d.alias,
          d.condition,
        );
      });
    }

    if (!queryBuilder || baseQuery) {
      query.andWhere({
        ...data,
        isDelete: false,
      });
    }

    const [records, total] = await query
      .skip((current - 1) * size || 0)
      .take(size)
      .orderBy(`${alias}.updateTime`, 'DESC')
      .getManyAndCount();

    return {
      size,
      current,
      total: Number(total),
      records,
    };
  }
}
