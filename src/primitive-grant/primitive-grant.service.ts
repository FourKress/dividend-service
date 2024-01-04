import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, DataSource } from 'typeorm';
import { PrimitiveGrantEntity } from './entity/primitive-grant.entity';
import {
  ShareholderGrantDto,
  PrimitiveGrantPageDto,
  PrimitiveGrantDto,
} from './dto';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { ShareholderTypeEnum } from '../common/enum';
import { ResponseTools } from '../common/utils/response-tools';
import { IShareholderGrantItem } from './interface/IShareholder-grant-item';
import { MainCompanyService } from '../main-company/main-company.service';

const Moment = require('moment');

@Injectable()
export class PrimitiveGrantService {
  @InjectRepository(PrimitiveGrantEntity)
  private readonly primitiveGrantRepository: Repository<PrimitiveGrantEntity>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly mainCompanyService: MainCompanyService,
  ) {}

  async createBatch(createGrantList: PrimitiveGrantDto[]): Promise<boolean> {
    const values = await this.handleCreate(createGrantList);
    const grantList = await this.primitiveGrantRepository
      .createQueryBuilder('primitiveGrant')
      .insert()
      .values(values)
      .execute();

    if (!grantList) {
      return false;
    }
    return true;
  }

  async handleCreate(createGrantList): Promise<PrimitiveGrantEntity[]> {
    const mainCompanyNameArr = createGrantList.map((d) => d.mainCompanyName);
    const mainCompanyList = await this.mainCompanyService.findByNameAll(
      mainCompanyNameArr,
    );

    const grantList = createGrantList.map((d) => {
      const targetMainCompany = mainCompanyList.find(
        (c) => c.name === d.mainCompanyName,
      );
      const { id, companyBody, region } = targetMainCompany;

      return {
        ...d,
        mainCompanyId: id,
        companyBody,
        region: region['value'],
      };
    });

    return grantList;
  }

  async getPageList(
    pageSearch: PrimitiveGrantPageDto,
  ): Promise<IPageInterface<PrimitiveGrantEntity>> {
    const {
      mainCompanyName,
      companyBody,
      grantTimeStart,
      grantTimeEnd,
      ...data
    } = pageSearch;

    const params = {
      ...data,
    };

    if (mainCompanyName) {
      params['mainCompanyName'] = Like(`%${mainCompanyName}%`);
    }
    if (companyBody) {
      params['companyBody'] = Like(`%${companyBody}%`);
    }

    const repository = this.primitiveGrantRepository;
    const queryBuilder = repository.createQueryBuilder('primitiveGrant');
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

    return await new PageService(repository, params).fetch({
      queryBuilder,
      alias: 'primitiveGrant',
    });
  }

  async changeGrantByIds(changeData: any[]): Promise<boolean> {
    // 获取连接并创建新的queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 创建查询
    const queryBuilder = queryRunner.manager
      .getRepository(PrimitiveGrantEntity)
      .createQueryBuilder('primitiveGrant');
    // 开始事务：
    await queryRunner.startTransaction();
    let updateFlag = false;

    try {
      changeData.map(async (d) => {
        const { id, ...info } = d;
        await queryBuilder
          .update()
          .where({ id })
          .set({
            ...info,
          })
          .execute();
      });
      // 提交事务：
      await queryRunner.commitTransaction();
      updateFlag = true;
    } catch (err) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      console.log(err);
      ResponseTools.fail('编辑失败，请联系管理员');
      updateFlag = false;
    } finally {
      await queryRunner.release();
    }

    return updateFlag;
  }

  async shareholderGrant(
    grantParams: ShareholderGrantDto,
  ): Promise<IShareholderGrantItem[]> {
    const { grantId, mainCompanyId } = grantParams;

    const queryBuild = await this.primitiveGrantRepository.query(`SELECT
      t3.mainCompanyId,
      t3.mainCompanyName,
      t3.region,
      
      t2.\`name\` AS staffName,
      t2.jobNo,
      t2.id AS staffId,
      
      t1.id AS shareholderId,
      t1.dividendRatio,
      
      t3.id AS grantId,
      t3.awaitGrantBase,
      t3.realGrantBase
      
      FROM
      ( SELECT * FROM shareholder WHERE shareholder.isDelete = 0 AND shareholder.shareholderType = '${ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER}' AND ${mainCompanyId} = shareholder.companyId  ) t1
      LEFT JOIN staff t2 ON t2.isDelete = 0 
      AND t1.staffId = t2.id
      LEFT JOIN \`primitive-grant\` t3 ON t3.isDelete = 0 
      AND ${grantId} = t3.id
    `);

    if (!queryBuild) {
      ResponseTools.fail('原始股分配查询失败');
    }

    return queryBuild;
  }

  async shareholderGrantBatch(
    grantList: ShareholderGrantDto[],
  ): Promise<IShareholderGrantItem[]> {
    const awaitGrantList = [];
    await Promise.all(
      grantList.map(async (d) => {
        const grant = await this.shareholderGrant(d);
        awaitGrantList.push(...grant);
      }),
    );
    return awaitGrantList;
  }
}
