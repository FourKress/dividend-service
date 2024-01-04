import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ShareholderGrantEntity } from './entity/shareholder-grant-entity';
import { ResponseTools } from '../common/utils/response-tools';
import {
  ShareholderGrantDto,
  ShareholderGrantPageDto,
  StaffGrantDetailPageDto,
  StaffGrantPageDto,
} from './dto';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { IStaffGrantItem } from './interface/staffGrantItem';
import { VirtualGrantService } from '../virtual-grant/virtual-grant.service';
import { PrimitiveGrantService } from '../primitive-grant/primitive-grant.service';
import { ShareholderTypeEnum } from '../common/enum';

const Moment = require('moment');

@Injectable()
export class ShareholderGrantService {
  @InjectRepository(ShareholderGrantEntity)
  private readonly repository: Repository<ShareholderGrantEntity>;

  constructor(
    private readonly virtualGrantService: VirtualGrantService,
    private readonly primitiveGrantService: PrimitiveGrantService,
  ) {}

  async create(grant: ShareholderGrantDto): Promise<boolean> {
    const { grantList, grantTime, shareholderType } = grant;

    const grantRecords = grantList.map((d) => {
      return {
        ...d,
        grantTime,
      };
    });

    const shareholderGrantRecords = await this.repository
      .createQueryBuilder('shareholderGrant')
      .insert()
      .values(grantRecords)
      .execute();

    if (!shareholderGrantRecords) {
      return false;
    }

    const changeData = grantList.map((d) => {
      const { grantId } = d;
      return {
        id: grantId,
        grantStatus: 1,
        grantTime: Moment().format('YYYY-MM-DD HH:mm:ss'),
      };
    });
    if (shareholderType === ShareholderTypeEnum.VIRTUAL_SHAREHOLDER) {
      await this.virtualGrantService.changeGrantByIds(changeData);
    } else if (shareholderType === ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER) {
      await this.primitiveGrantService.changeGrantByIds(changeData);
    }

    return true;
  }

  async details(id: string): Promise<ShareholderGrantEntity> {
    const grantDetails = await this.repository.findOneBy({ id });
    if (!grantDetails) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return grantDetails;
  }

  async getPageList(
    pageSearch: ShareholderGrantPageDto,
  ): Promise<IPageInterface<ShareholderGrantEntity>> {
    const { mainCompanyName, grantTimeEnd, grantTimeStart, ...data } =
      pageSearch;
    const params = mainCompanyName
      ? {
          ...data,
          mainCompanyName: Like(`%${pageSearch?.mainCompanyName}%`),
        }
      : data;
    const { repository } = this;
    const queryBuilder = repository.createQueryBuilder('shareholderGrant');
    if (grantTimeStart && grantTimeEnd) {
      queryBuilder.where('grantTime BETWEEN :start AND :end', {
        start: grantTimeStart,
        end: grantTimeEnd,
      });
    } else if (grantTimeStart && !grantTimeEnd) {
      queryBuilder.where('grantTime >= :start', {
        start: grantTimeStart,
      });
    } else if (!grantTimeStart && grantTimeEnd) {
      queryBuilder.where('grantTime <= :end', {
        end: grantTimeEnd,
      });
    }

    return await new PageService(this.repository, params).fetch({
      queryBuilder,
      alias: 'shareholderGrant',
    });
  }

  async staffGrantPage(
    pageSearch: StaffGrantPageDto,
  ): Promise<IPageInterface<IStaffGrantItem>> {
    const { size, current, ...params } = pageSearch;
    const { staffName, region } = params;

    let filterSql = '';
    if (region !== undefined || staffName) {
      filterSql = 'WHERE';
      if (staffName) {
        filterSql = `WHERE s.staffName LIKE '%${staffName}%'`;
      }
      if (region !== undefined) {
        filterSql += ` ${staffName ? 'AND ' : ''}s.region = '${region}'`;
      }
    }

    const queryBuild = await this.repository.query(`SELECT
      SQL_CALC_FOUND_ROWS
      m.staffName,
      m.staffId,
      m.jobNo,
      m.position,
      m.region,
      m.companyName,
      max( m.virtualShouldAmt ) virtualShouldAmt,
      max( m.virtualRealAmt ) virtualRealAmt,
      max( m.virtualSurplusAmt ) virtualSurplusAmt,
      max( m.primitiveShouldAmt ) primitiveShouldAmt,
      max( m.primitiveRealAmt ) primitiveRealAmt,
      max( m.primitiveSurplusAmt ) primitiveSurplusAmt
      
      FROM
        ( SELECT
          staffName,
          staffId,
          jobNo,
          position,
          region,
          companyName,
          shareholderType,
          
          CASE
            WHEN t.shareholderType = '${
              ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
            }' THEN
            shouldAmt ELSE NULL 
          END virtualShouldAmt,
          
          CASE
            WHEN t.shareholderType = '${
              ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
            }' THEN
            realAmt ELSE NULL 
          END virtualRealAmt,
          
          CASE
            WHEN t.shareholderType = '${
              ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
            }' THEN
            surplusAmt ELSE NULL 
          END virtualSurplusAmt,
          
          CASE
            WHEN t.shareholderType = '${
              ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER
            }' THEN
            shouldAmt ELSE NULL 
          END primitiveShouldAmt,
          
          CASE
            WHEN t.shareholderType = '${
              ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER
            }' THEN
            realAmt ELSE NULL 
          END primitiveRealAmt,
          
          CASE
            WHEN t.shareholderType = '${
              ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER
            }' THEN
            surplusAmt ELSE NULL 
          END primitiveSurplusAmt 
      
        FROM
          ( SELECT
            staffName,
            staffId,
            t0.jobNo,
            t0.region,
            t1.position,
            t1.companyName,
            shareholderType,
            sum( awaitGrantAmount ) shouldAmt,
            sum( realGrantAmount ) realAmt,
            sum( unpaidGrantAmount ) surplusAmt
            
          FROM
          ( SELECT * FROM \`shareholder-grant\` s ${filterSql} ) t0
          
          LEFT JOIN staff t1 ON t1.isDelete = 0 
          AND t0.staffId = t1.id
          
          GROUP BY
            staffId,
            shareholderType 
        ) t 
      ) m 
      GROUP BY
      m.staffId
      
      LIMIT ${(current - 1) * size || 0},${size};
    `);

    const [{ total }] = await this.repository.query(`SELECT
      FOUND_ROWS() total`);

    return {
      total: Number(total),
      size,
      current,
      records: queryBuild,
    };
  }

  async staffGrantDetailPage(
    pageSearch: StaffGrantDetailPageDto,
  ): Promise<IPageInterface<ShareholderGrantEntity>> {
    const { mainCompanyName, grantTimeEnd, grantTimeStart, ...data } =
      pageSearch;
    const params = mainCompanyName
      ? {
          ...data,
          mainCompanyName: Like(`%${pageSearch?.mainCompanyName}%`),
        }
      : { ...data };

    const queryBuilder = this.repository.createQueryBuilder('shareholderGrant');

    if (grantTimeStart && grantTimeEnd) {
      queryBuilder.where('grantTime BETWEEN :start AND :end', {
        start: grantTimeStart,
        end: grantTimeEnd,
      });
    } else if (grantTimeStart && !grantTimeEnd) {
      queryBuilder.where('grantTime >= :start', {
        start: grantTimeStart,
      });
    } else if (!grantTimeStart && grantTimeEnd) {
      queryBuilder.where('grantTime <= :end', {
        end: grantTimeEnd,
      });
    }

    return await new PageService(this.repository, params).fetch({
      queryBuilder,
      alias: 'shareholderGrant',
    });
  }
}
