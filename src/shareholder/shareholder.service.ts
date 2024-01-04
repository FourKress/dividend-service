import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder, DataSource, In } from 'typeorm';
import { ShareholderTypeEnum } from '../common/enum';
import { ShareholderEntity } from './entity/shareholder.entity';
import {
  ShareholderDto,
  AgentLegalPersonDto,
  HoldingShareholderDto,
  VirtualShareholderDto,
  PrimitiveShareholderDto,
  ShareholderPageDto,
  OfficeRecordsDto,
  ShareholderRecordsDto,
  BusinessLicenseGrantDto,
} from './dto';
import { ResponseTools } from '../common/utils/response-tools';
import { ILeftJoin } from '../common/interfaces/leftJoin.interface';
import { IShareholderItem } from './interface/shareholderItem';
import { IShareholderPageItem } from './interface/shareholderPageItem';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { IShareholderRecordsItem } from './interface/shareholderRecordsItem';

const Moment = require('moment');

@Injectable()
export class ShareholderService {
  @InjectRepository(ShareholderEntity)
  private readonly shareholderRepository: Repository<ShareholderEntity>;

  constructor(private dataSource: DataSource) {}

  private readonly leftJoinCompany: ILeftJoin = {
    mapToProperty: 'shareholder.company',
    property: 'company',
    alias: 'company',
    condition:
      'shareholder.companyId = company.id AND company.isDelete = false',
  };

  private readonly leftJoinStaff: ILeftJoin = {
    mapToProperty: 'shareholder.staff',
    property: 'staff',
    alias: 'staff',
    condition: 'shareholder.staffId = staff.id AND staff.isDelete = false',
  };

  async create(createShareholder: ShareholderDto): Promise<boolean> {
    await this.checkShareholderRepeat(createShareholder);

    const values = [];
    Object.values(createShareholder).forEach((d) => {
      if (d) {
        values.push(...d);
      }
    });

    const shareholder = await this.shareholderRepository
      .createQueryBuilder('shareholder')
      .insert()
      .values(values)
      .execute();
    if (!shareholder) {
      return false;
    }
    return true;
  }

  async proxyCreate(createProxyShareholder: ShareholderDto): Promise<boolean> {
    await this.checkBusinessLicenseRatio(createProxyShareholder);

    const values = [];
    Object.values(createProxyShareholder).forEach((d) => {
      if (d) {
        values.push(d);
      }
    });

    const proxyShareholder = await this.shareholderRepository
      .createQueryBuilder('shareholder')
      .insert()
      .values(values)
      .execute();
    if (!proxyShareholder) {
      return false;
    }
    return true;
  }

  async details(companyId: string): Promise<IShareholderItem[]> {
    return await this.shareholderRepository
      .createQueryBuilder('shareholder')
      .where({
        companyId,
        isDelete: false,
      })
      .getMany();
  }

  async edit(editShareholder: ShareholderDto): Promise<boolean> {
    const { virtualShareholder, primitiveShareholder } = editShareholder;
    await this.checkShareholderRepeat(editShareholder);
    // 获取连接并创建新的queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 创建查询
    const queryBuilder = queryRunner.manager
      .getRepository(ShareholderEntity)
      .createQueryBuilder('shareholder');
    // 开始事务：
    await queryRunner.startTransaction();
    let editFlag = false;
    try {
      // 对此事务执行一些操作：
      await this.virtualShareholder(virtualShareholder, queryBuilder);
      await this.primitiveShareholder(primitiveShareholder, queryBuilder);
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

  async proxyEdit(editProxyShareholder: ShareholderDto): Promise<boolean> {
    const { holdingShareholder, agentLegalPerson } = editProxyShareholder;
    await this.checkBusinessLicenseRatio(editProxyShareholder);
    // 获取连接并创建新的queryRunner
    const queryRunner = this.dataSource.createQueryRunner();
    // 使用我们的新queryRunner建立真正的数据库连
    await queryRunner.connect();
    // 创建查询
    const queryBuilder = queryRunner.manager
      .getRepository(ShareholderEntity)
      .createQueryBuilder('shareholder');
    // 开始事务：
    await queryRunner.startTransaction();
    let editFlag = false;
    try {
      // 对此事务执行一些操作：
      await this.agentLegalPerson(agentLegalPerson, queryBuilder);
      await this.holdingShareholder(holdingShareholder, queryBuilder);
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

  async checkBusinessLicenseRatio(
    shareholder: ShareholderDto,
  ): Promise<boolean> {
    const { agentLegalPerson = null, holdingShareholder = null } = shareholder;
    if (!(agentLegalPerson && holdingShareholder)) {
      return true;
    }
    const ratio =
      Number(agentLegalPerson.shareholderRatio) +
      Number(holdingShareholder.shareholderRatio);
    if (ratio > 100) {
      ResponseTools.fail('营业执照法人和股东的股份比例相加不能大于100%');
      return false;
    }
    return true;
  }

  async checkShareholderRepeat(shareholder: ShareholderDto): Promise<boolean> {
    const { virtualShareholder = [], primitiveShareholder = [] } = shareholder;

    const authorizeTimeObj = {};
    const virtualShareholderIds = [];
    const primitiveShareholderIds = [];
    let virtualShareholderRatio = 0;
    let primitiveShareholderRatio = 0;

    virtualShareholder.forEach((d) => {
      if (!virtualShareholderIds.includes(d.staffId)) {
        virtualShareholderIds.push(d.staffId);
      }
      if (authorizeTimeObj[d.authorizeTime]?.length) {
        authorizeTimeObj[d.authorizeTime].push(d);
      } else {
        authorizeTimeObj[d.authorizeTime] = [d];
      }
      virtualShareholderRatio += Number(d.shareholderRatio);
    });
    primitiveShareholder.forEach((d) => {
      if (!primitiveShareholderIds.includes(d.staffId)) {
        primitiveShareholderIds.push(d.staffId);
      }
      primitiveShareholderRatio += Number(d.dividendRatio);
    });

    if (virtualShareholderIds?.length < virtualShareholder.length) {
      ResponseTools.fail('模拟股东不能重复');
      return false;
    }
    if (virtualShareholderRatio > 27) {
      ResponseTools.fail('模拟股东持股比例相加不能大于27%');
      return false;
    }

    Object.values(authorizeTimeObj).forEach((v: VirtualShareholderDto[]) => {
      const discountBaseArr = [
        ...new Set(v.map((c) => Number(c.discountBase).toFixed(2))),
      ];
      const noDiscountBaseArr = [
        ...new Set(v.map((c) => Number(c.noDiscountBase).toFixed(2))),
      ];
      if (discountBaseArr?.length > 1) {
        ResponseTools.fail('模拟股东相同授权时间的打折基数必须相同');
      }
      if (noDiscountBaseArr?.length > 1) {
        ResponseTools.fail('模拟股东相同授权时间的不打折基数必须相同');
      }
    });

    if (primitiveShareholderIds?.length < primitiveShareholder.length) {
      ResponseTools.fail('原始股东不能重复');
      return false;
    }
    if (primitiveShareholderRatio > 100) {
      ResponseTools.fail('原始股东分红占比相加不能大于100%');
      return false;
    }

    return true;
  }

  async agentLegalPerson(
    agentLegalPerson: AgentLegalPersonDto,
    query: SelectQueryBuilder<ShareholderEntity>,
  ): Promise<SelectQueryBuilder<ShareholderEntity>> {
    if (!agentLegalPerson) return;
    return await this.handleUpdateAndInsert(agentLegalPerson, query);
  }

  async holdingShareholder(
    holdingShareholder: HoldingShareholderDto,
    query: SelectQueryBuilder<ShareholderEntity>,
  ): Promise<SelectQueryBuilder<ShareholderEntity>> {
    if (!holdingShareholder) return;
    return await this.handleUpdateAndInsert(holdingShareholder, query);
  }

  async handleUpdateAndInsert(
    shareholder: AgentLegalPersonDto | HoldingShareholderDto,
    query: SelectQueryBuilder<ShareholderEntity>,
  ): Promise<SelectQueryBuilder<ShareholderEntity>> {
    const { isDelete, id, ...info } = shareholder;
    if (isDelete) {
      const tempEndTime = Moment(info.proxyStartTime)
        .subtract(1, 'day')
        .format('YYYY-MM-DD');
      const proxyEndTime =
        Moment(tempEndTime).diff(info.proxyStartTime) > 0
          ? tempEndTime
          : info.proxyStartTime;
      await query
        .update()
        .where({ id })
        .set({ isDelete: true, proxyEndTime })
        .execute();
      if (info.staffId) {
        await query.insert().values(info).execute();
      }
    } else {
      await query.update().where({ id }).set(info).execute();
    }
    return query;
  }

  async virtualShareholder(
    virtualShareholder: VirtualShareholderDto[],
    query: SelectQueryBuilder<ShareholderEntity>,
  ): Promise<SelectQueryBuilder<ShareholderEntity>> {
    if (!virtualShareholder.length) return;
    return await this.handleBatchUpdate(virtualShareholder, query);
  }

  async primitiveShareholder(
    primitiveShareholder: PrimitiveShareholderDto[],
    query: SelectQueryBuilder<ShareholderEntity>,
  ): Promise<SelectQueryBuilder<ShareholderEntity>> {
    if (!primitiveShareholder.length) return;
    return await this.handleBatchUpdate(primitiveShareholder, query);
  }

  async handleBatchUpdate(
    shareholder: VirtualShareholderDto[] | PrimitiveShareholderDto[],
    query: SelectQueryBuilder<ShareholderEntity>,
  ): Promise<SelectQueryBuilder<ShareholderEntity>> {
    shareholder.map(async (d) => {
      const { id, isDelete, ...info } = d;
      const setData = isDelete ? { isDelete: true } : info;
      if (isDelete || id) {
        await query.update().where({ id }).set(setData).execute();
      } else {
        await query.insert().values(info).execute();
      }
    });
    return query;
  }

  async getBusinessLicenseDetails(
    companyId: string,
  ): Promise<ShareholderEntity[]> {
    const queryBuilder = this.shareholderRepository
      .createQueryBuilder('shareholder')
      .where({
        companyId,
        isDelete: false,
      })
      .andWhere('shareholder.shareholderType IN (:...shareholderType)', {
        shareholderType: [
          String(ShareholderTypeEnum.AGENT_LEGAL_PERSON),
          String(ShareholderTypeEnum.HOLDING_SHAREHOLDER),
        ],
      })
      .leftJoinAndMapOne(
        this.leftJoinStaff.mapToProperty,
        this.leftJoinStaff.property,
        this.leftJoinStaff.alias,
        this.leftJoinStaff.condition,
      );
    return await queryBuilder.getMany();
  }

  async getPageList(
    pageSearch: ShareholderPageDto,
  ): Promise<IPageInterface<IShareholderPageItem>> {
    const { size, current, ...data } = pageSearch;
    const { shareholderType, companyId } = data;

    let shareholderTypes = `'${ShareholderTypeEnum.VIRTUAL_SHAREHOLDER}', '${ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER}'`;
    if (shareholderType) {
      shareholderTypes = `'${shareholderType}'`;
    }

    const queryBuilder = await this.shareholderRepository.query(
      `SELECT
      SQL_CALC_FOUND_ROWS
      t3.id,
      t3.staffId,
      t3.companyId,
      t5.securityDepositAmount,
      t6.NAME staffName,
      t6.jobNo,
      t6.position,
      t6.rank,
      t6.bankName,
      t6.account,
      t6.accountName,
      
      CASE
        WHEN t3.shareholderType IS NOT NULL 
        AND t4.shareholderType IS NOT NULL THEN
          CONCAT( t3.shareholderType, ',', t4.shareholderType ) 
          WHEN t3.shareholderType IS NULL THEN
          t4.shareholderType 
          WHEN t4.shareholderType IS NULL THEN
          t3.shareholderType 
      END shareholderType,
      
      CASE
        WHEN t3.shareholderType = '${
          ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
        }' THEN
        t4.dividendRatio ELSE t3.dividendRatio 
      END dividendRatio,
      
      CASE
        WHEN t3.shareholderType = '${
          ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
        }' THEN
        t3.shareholderRatio ELSE t4.shareholderRatio 
      END shareholderRatio 
      
      FROM
        ( SELECT * FROM shareholder t1 WHERE t1.companyId = ${companyId} AND t1.isDelete = 0 AND t1.shareholderType IN ( '${
        ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER
      }', '${ShareholderTypeEnum.VIRTUAL_SHAREHOLDER}' ) ) t3
        LEFT JOIN ( SELECT * FROM shareholder t1 WHERE t1.companyId = ${companyId} AND t1.isDelete = 0 AND t1.shareholderType IN ( '${
        ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER
      }', '${
        ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
      }' ) ) t4 ON t3.staffId = t4.staffId 
        AND t3.id != t4.id
        LEFT JOIN \`main-company\` t5 ON t5.isDelete = 0 
        AND t3.companyId = t5.id
        LEFT JOIN staff t6 ON t6.isDelete = 0 
        AND t3.staffId = t6.id 
      WHERE
        t3.shareholderType IN ( ${shareholderTypes} ) 
      GROUP BY
        t3.staffId
      LIMIT ${(current - 1) * size || 0},${size};
    `,
    );

    const [{ total }] = await this.shareholderRepository.query(`SELECT
      FOUND_ROWS() total`);

    return {
      total: Number(total),
      size,
      current,
      records: queryBuilder,
    };
  }

  async getStatistics(companyId: string): Promise<ShareholderEntity[]> {
    const queryBuilder = this.shareholderRepository
      .createQueryBuilder('shareholder')
      .where({
        companyId,
        isDelete: false,
      })
      .andWhere('shareholder.shareholderType IN (:...shareholderType)', {
        shareholderType: [
          String(ShareholderTypeEnum.VIRTUAL_SHAREHOLDER),
          String(ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER),
        ],
      });
    return await queryBuilder.getMany();
  }

  async getHoldMonth(records: IShareholderItem[]): Promise<IShareholderItem[]> {
    return records.map((d) => {
      const { staff, proxyStartTime, proxyEndTime } = d;
      const startTime = proxyEndTime
        ? proxyEndTime
        : Moment().format('YYYY-MM-DD');
      const holdDay = Moment(startTime).diff(proxyStartTime, 'day');
      const month = parseInt(String(holdDay / 30));
      const residue = holdDay % 30;

      let holdMonth;
      if (residue === 0) {
        holdMonth = month;
      } else if (residue <= 15) {
        holdMonth = month + 0.5;
      } else if (residue > 15) {
        holdMonth = month + 1;
      }

      return {
        ...d,
        staff,
        proxyStartTime,
        proxyEndTime: proxyEndTime ? proxyEndTime : '',
        holdMonth,
      };
    });
  }

  async getGrantAmount(
    records: IShareholderItem[],
  ): Promise<IShareholderItem[]> {
    return records.map((d) => {
      const { shareholderType, holdMonth, companyAttribute, companyYears } = d;

      const { checkFlag, settleInQuantity, invoiceAmount, transactionAmount } =
        companyAttribute;

      let grantAmount = '';

      const value = shareholderType['value'] as number;
      switch (value) {
        case ShareholderTypeEnum.AGENT_LEGAL_PERSON:
          grantAmount = (
            (companyAttribute.actingLegalPersonFeeAmount / 12) *
            holdMonth
          ).toFixed(2);
          break;
        case ShareholderTypeEnum.HOLDING_SHAREHOLDER:
          grantAmount = (
            (companyAttribute.holdShareholderFeeAmount / 12) *
            holdMonth
          ).toFixed(2);
          break;
      }

      if (checkFlag && companyYears) {
        const {
          invoiceAmount: yearInvoiceAmount,
          settleInQuantity: yearSettleInQuantity,
          transactionAmount: yearTransactionAmount,
        } = companyYears;

        if (
          !(
            Number(yearTransactionAmount) >= Number(transactionAmount) ||
            Number(yearInvoiceAmount) >= Number(invoiceAmount) ||
            Number(yearSettleInQuantity) >= Number(settleInQuantity)
          )
        ) {
          grantAmount = '0.00';
        }
      }

      return {
        ...d,
        grantAmount,
      };
    });
  }

  async getOfficeRecords(
    params: OfficeRecordsDto,
  ): Promise<ShareholderEntity[]> {
    return await this.shareholderRepository
      .createQueryBuilder('shareholder')
      .where(params)
      .leftJoinAndMapOne(
        this.leftJoinStaff.mapToProperty,
        this.leftJoinStaff.property,
        this.leftJoinStaff.alias,
        this.leftJoinStaff.condition,
      )
      .getMany();
  }

  async getBusinessLicenseGrant(
    grantParams: BusinessLicenseGrantDto,
  ): Promise<ShareholderEntity[]> {
    const { grantYears, companyIds } = grantParams;

    const queryBuilder = this.shareholderRepository
      .createQueryBuilder('shareholder')
      .where({
        companyId: In(companyIds),
      })
      .andWhere('shareholder.shareholderType IN (:...shareholderType)', {
        shareholderType: [
          String(ShareholderTypeEnum.AGENT_LEGAL_PERSON),
          String(ShareholderTypeEnum.HOLDING_SHAREHOLDER),
        ],
      })
      .leftJoinAndMapOne(
        this.leftJoinStaff.mapToProperty,
        this.leftJoinStaff.property,
        this.leftJoinStaff.alias,
        this.leftJoinStaff.condition,
      )
      .leftJoinAndMapOne(
        this.leftJoinCompany.mapToProperty,
        this.leftJoinCompany.property,
        this.leftJoinCompany.alias,
        this.leftJoinCompany.condition,
      )
      .leftJoinAndMapOne(
        'shareholder.companyAttribute',
        'company-attribute',
        'companyAttribute',
        'company.attributeId = companyAttribute.id AND companyAttribute.isDelete = false',
      )
      .leftJoinAndMapOne(
        'shareholder.companyYears',
        'company-years',
        'companyYears',
        `shareholder.companyId = companyYears.companyId AND companyYears.years = '${grantYears}' AND companyYears.isDelete = false`,
      );
    return await queryBuilder.getMany();
  }

  async getShareholderByStaffId(
    pageSearch: ShareholderRecordsDto,
  ): Promise<IPageInterface<IShareholderRecordsItem>> {
    return await new PageService(this.shareholderRepository, pageSearch).fetch({
      alias: 'shareholder',
      leftJoinAndMapOne: [this.leftJoinCompany],
    });
  }

  async handleChangeProxyTimeById(ids): Promise<any> {
    const proxyStartTime = Moment().format('YYYY-MM-DD');
    const query = this.shareholderRepository.createQueryBuilder('shareholder');
    ids.map(async (id) => {
      await query
        .update()
        .where({ id })
        .set({
          proxyStartTime,
        })
        .execute();
    });
    await query;
  }

  async getByMainCompanyIds(ids: string[]): Promise<ShareholderEntity[]> {
    return await this.shareholderRepository.findBy({
      isDelete: false,
      companyId: In(ids),
      shareholderType: ShareholderTypeEnum.VIRTUAL_SHAREHOLDER,
    });
  }
}
