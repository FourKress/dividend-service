import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FlowDetailsEntity } from './entity/flowDetails.entity';
import { Like, Repository } from 'typeorm';
import { ResponseTools } from '../common/utils/response-tools';
import { FlowDetailsDto } from './dto/flowDetails.dto';
import { FlowDetailsPageDto } from './dto/flowDetailsPage.dto';
import { IPageInterface } from '../common/interfaces/page.interface';
import { PageService } from '../common/utils/pageService';

@Injectable()
export class FlowDetailsService {
  @InjectRepository(FlowDetailsEntity)
  private readonly flowDetailsRepository: Repository<FlowDetailsEntity>;

  async create(createFlowDetails: FlowDetailsDto): Promise<boolean> {
    const flowDetails = await this.flowDetailsRepository.save(
      createFlowDetails,
    );

    if (!flowDetails) {
      return false;
    }

    return true;
  }

  async edit(editFlowDetails: FlowDetailsDto): Promise<boolean> {
    const { id, ...info } = editFlowDetails;

    const { affected } = await this.flowDetailsRepository.update(id, info);
    return affected === 1;
  }

  async details(id: string): Promise<FlowDetailsEntity> {
    const FlowDetails = await this.flowDetailsRepository.findOneBy({ id });
    if (!FlowDetails) {
      ResponseTools.fail('未找到对应详情数据!');
    }

    return FlowDetails;
  }

  async getPageList(
    pageSearch: FlowDetailsPageDto,
  ): Promise<IPageInterface<FlowDetailsEntity>> {
    const { payer, payDateEnd, payDateStart, ...data } = pageSearch;
    const params = payer
      ? {
          ...data,
          payer: Like(`%${pageSearch?.payer}%`),
        }
      : data;

    const repository = this.flowDetailsRepository;
    const queryBuilder = repository.createQueryBuilder('flowDetails');
    if (payDateStart && payDateEnd) {
      queryBuilder.where('payDate BETWEEN :start AND :end', {
        start: payDateStart,
        end: payDateEnd,
      });
    } else if (payDateStart && !payDateEnd) {
      queryBuilder.where('payDate >= :start', {
        start: payDateStart,
      });
    } else if (!payDateStart && payDateEnd) {
      queryBuilder.where('payDate <= :end', {
        end: payDateEnd,
      });
    }

    return await new PageService(repository, params).fetch({
      queryBuilder,
      alias: 'flowDetails',
    });
  }

  async createBatch(flowDetailsList: FlowDetailsDto[]): Promise<boolean> {
    const company = await this.flowDetailsRepository
      .createQueryBuilder('flowDetails')
      .insert()
      .values(flowDetailsList)
      .execute();
    if (!company) {
      return false;
    }
    return true;
  }
}
