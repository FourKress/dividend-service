import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository, DataSource } from 'typeorm';
import { VirtualGrantEntity } from './entity/virtual-grant.entity';
import {
  EditBaseDto,
  ShareholderGrantDto,
  VirtualGrantDto,
  VirtualGrantPageDto,
} from './dto';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { BooleanFlagEnum, ShareholderTypeEnum } from '../common/enum';
import { ResponseTools } from '../common/utils/response-tools';
import { ShareholderService } from '../shareholder/shareholder.service';
import { IShareholderGrantItem } from './interface/IShareholder-grant-item';

@Injectable()
export class VirtualGrantService {
  @InjectRepository(VirtualGrantEntity)
  private readonly virtualGrantRepository: Repository<VirtualGrantEntity>;

  constructor(
    private dataSource: DataSource,
    private readonly shareholderService: ShareholderService,
  ) {}

  async generateData(grantYears: string): Promise<boolean> {
    const queryBuild = await this.virtualGrantRepository.query(`SELECT
      t2.id AS mainCompanyId,
      t2.NAME AS mainCompanyName,
      t2.companyBody,
      t2.region,
      t2.isNew,
      t2.isSharesTransfer,
      t1.authorizeTime,
      t1.discountBase,
      t1.noDiscountBase,
      
      t4.unpaidGrantBase
      
      FROM
      ( SELECT * FROM shareholder WHERE shareholder.isDelete = 0 AND shareholder.shareholderType = '${
        ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
      }' ) t1
      LEFT JOIN \`main-company\` t2 ON t2.isDelete = 0 
      AND t1.companyId = t2.id
      LEFT JOIN staff t3 ON t3.isDelete = 0 
      AND t1.staffId = t3.id
      LEFT JOIN \`virtual-grant\` t4 ON t4.isDelete = 0
      AND t2.id = t4.mainCompanyId AND t4.authorizeTime = t1.authorizeTime AND t4.grantYears = '${
        Number(grantYears) - 1
      }'
      
      GROUP BY
      t1.authorizeTime
    `);
    if (!queryBuild) {
      ResponseTools.fail('模拟股分配数据生成失败');
    }

    const values = queryBuild.map((d) => {
      const { unpaidGrantBase = 0 } = d;
      return {
        ...d,
        grantYears,
        grantStatus: 0,
        yearUnpaidGrantAmount: unpaidGrantBase,
      };
    });

    const insertValue = await this.setGrantBase(values);

    const records = await this.virtualGrantRepository
      .createQueryBuilder('virtualGrant')
      .insert()
      .values(insertValue)
      .execute();
    if (!records) {
      return false;
    }
    return true;
  }

  async batchUpData(virtualGrant: VirtualGrantDto[]): Promise<boolean> {
    const tempGrantList = await this.setGrantBase(virtualGrant);
    const grantList = await this.setGrantAmount(tempGrantList);
    return await this.changeGrantByIds(grantList);
  }

  async setGrantBase(
    virtualGrant: VirtualGrantDto[],
  ): Promise<VirtualGrantDto[]> {
    const grantList = virtualGrant.map((d) => {
      const {
        noDiscountBase,
        discountBase,
        yearAmount = 0,
        isSharesTransfer,
        realGrantBase = 0,
      } = d;

      let awaitGrantBase =
        Number(isSharesTransfer) === BooleanFlagEnum.TRUE
          ? Number(noDiscountBase)
          : Number(discountBase);

      if (awaitGrantBase > 0) {
        if (yearAmount <= 0) {
          awaitGrantBase = yearAmount;
        } else if (awaitGrantBase >= yearAmount) {
          awaitGrantBase = 0;
        } else {
          awaitGrantBase = yearAmount - awaitGrantBase;
        }
      } else {
        if (yearAmount < 0) {
          awaitGrantBase = yearAmount;
        } else if (awaitGrantBase + yearAmount > 0) {
          awaitGrantBase = awaitGrantBase + yearAmount;
        } else {
          awaitGrantBase = 0;
        }
      }
      return {
        ...d,
        awaitGrantBase: Number(awaitGrantBase.toFixed(2)),
        unpaidGrantBase: Number(
          (awaitGrantBase - Number(realGrantBase)).toFixed(2),
        ),
      };
    });

    return grantList;
  }

  async setGrantAmount(
    virtualGrant: VirtualGrantDto[],
  ): Promise<VirtualGrantDto[]> {
    const ids = virtualGrant.map((d) => d.mainCompanyId);
    const shareholderList = await this.shareholderService.getByMainCompanyIds(
      ids,
    );

    const grantList = virtualGrant.map((d) => {
      const { mainCompanyId, awaitGrantBase, realGrantBase, authorizeTime } = d;

      const shareholderRatio =
        shareholderList
          .filter(
            (s) =>
              s.companyId === mainCompanyId.toString() &&
              s.authorizeTime === authorizeTime,
          )
          .reduce((sum, curr) => sum + Number(curr.shareholderRatio), 0) / 100;
      const awaitGrantAmount = shareholderRatio * awaitGrantBase;
      const realGrantAmount = shareholderRatio * realGrantBase;
      const unpaidGrantAmount = awaitGrantAmount - realGrantAmount;

      return {
        ...d,
        awaitGrantAmount: Number(awaitGrantAmount.toFixed(2)),
        realGrantAmount: Number(realGrantAmount.toFixed(2)),
        unpaidGrantAmount: Number(unpaidGrantAmount.toFixed(2)),
      };
    });

    return grantList;
  }

  async getPageList(
    pageSearch: VirtualGrantPageDto,
  ): Promise<IPageInterface<VirtualGrantEntity>> {
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

    const repository = this.virtualGrantRepository;
    const queryBuilder = repository.createQueryBuilder('virtualGrant');
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
      alias: 'virtualGrant',
    });
  }

  async changeGrantByIds(changeData: any[]): Promise<boolean> {
    // 获取连接并创建新的queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 创建查询
    const queryBuilder = queryRunner.manager
      .getRepository(VirtualGrantEntity)
      .createQueryBuilder('virtualGrant');
    // 开始事务：
    await queryRunner.startTransaction();
    let editFlag = false;

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

      editFlag = true;
    } catch (err) {
      // 有错误做出回滚更改
      await queryRunner.rollbackTransaction();
      console.log(err);
      ResponseTools.fail('编辑失败，请联系管理员');
      editFlag = false;
    } finally {
      await queryRunner.release();
    }

    return editFlag;
  }

  async shareholderGrant(
    grantParams: ShareholderGrantDto,
  ): Promise<IShareholderGrantItem[]> {
    const { grantId, authorizeTime, mainCompanyId } = grantParams;

    const queryBuild = await this.virtualGrantRepository.query(`SELECT
      t3.mainCompanyId,
      t3.mainCompanyName,
      t3.region,
      
      t2.\`name\` AS staffName,
      t2.jobNo,
      t2.id AS staffId,
      
      t1.id AS shareholderId,
      t1.shareholderRatio,
      
      t3.id AS grantId,
      t3.awaitGrantBase,
      t3.realGrantBase,
      
      t1.authorizeTime 
      
      FROM
      ( SELECT * FROM shareholder WHERE shareholder.isDelete = 0 AND shareholder.shareholderType = '${ShareholderTypeEnum.VIRTUAL_SHAREHOLDER}' AND '${authorizeTime}' = shareholder.authorizeTime AND ${mainCompanyId} = shareholder.companyId ) t1
      LEFT JOIN staff t2 ON t2.isDelete = 0 
      AND t1.staffId = t2.id
      LEFT JOIN \`virtual-grant\` t3 ON t3.isDelete = 0 
      AND ${grantId} = t3.id
    `);

    if (!queryBuild) {
      ResponseTools.fail('模拟股分配查询失败');
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

  async editBase(editParams: EditBaseDto): Promise<boolean> {
    const { id, realGrantBase } = editParams;
    const { affected } = await this.virtualGrantRepository.update(id, {
      realGrantBase,
    });
    return affected === 1;
  }
}
