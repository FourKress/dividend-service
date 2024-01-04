import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { ProxyGrantEntity } from './entity/proxy-grant.entity';
import { ProxyGrantDto } from './dto';
import { ResponseTools } from '../common/utils/response-tools';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';
import { ProxyGrantPageDto } from './dto/proxy-grant-page.dto';
import { ShareholderService } from '../shareholder/shareholder.service';

const Moment = require('moment');

@Injectable()
export class ProxyGrantService {
  @InjectRepository(ProxyGrantEntity)
  private readonly proxyGrantRepository: Repository<ProxyGrantEntity>;

  constructor(private readonly shareholderService: ShareholderService) {}

  async findByCompanyId(companyId: string): Promise<ProxyGrantEntity[]> {
    return await this.proxyGrantRepository.findBy({ companyId });
  }

  async create(createProxyGrant: ProxyGrantDto): Promise<boolean> {
    const { grantList, grantTime } = createProxyGrant;
    const companyId = grantList[0]?.companyId;
    if (!companyId) {
      ResponseTools.fail('companyId不能为空!');
    }

    // this.companyAttributeService.details();

    const checkByDB = await this.findByCompanyId(companyId);
    if (
      checkByDB.some((d) => Moment().startOf('day').diff(d.createTime) <= 0)
    ) {
      ResponseTools.fail('不能重复发放代持费用!');
    }

    const shareholderIds = [];
    const grantRecords = grantList.map((d) => {
      const { shareholderId, proxyEndTime } = d;
      shareholderIds.push(shareholderId);
      return {
        ...d,
        grantTime,
        proxyEndTime: proxyEndTime || Moment().format('YYYY-MM-DD'),
      };
    });

    const proxyGrantRecords = await this.proxyGrantRepository
      .createQueryBuilder('proxyGrant')
      .insert()
      .values(grantRecords)
      .execute();
    await this.shareholderService.handleChangeProxyTimeById(shareholderIds);

    if (!proxyGrantRecords) {
      return false;
    }
    return true;
  }

  async details(id: string): Promise<ProxyGrantEntity> {
    const proxyGrantDetails = await this.proxyGrantRepository.findOneBy({ id });
    if (!proxyGrantDetails) {
      ResponseTools.fail('未找到对应详情数据!');
    }
    return proxyGrantDetails;
  }

  async getPageList(
    pageSearch: ProxyGrantPageDto,
  ): Promise<IPageInterface<ProxyGrantEntity>> {
    const { companyName, grantTimeEnd, grantTimeStart, ...data } = pageSearch;
    const params = companyName
      ? {
          ...data,
          companyName: Like(`%${pageSearch?.companyName}%`),
        }
      : data;

    const repository = this.proxyGrantRepository;
    const queryBuilder = repository.createQueryBuilder('proxyGrant');
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

    return await new PageService(this.proxyGrantRepository, params).fetch({
      queryBuilder,
      alias: 'proxyGrant',
    });
  }
}
