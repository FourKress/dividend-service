import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProtocolEntity } from './entity/protocol.entity';
import { ProtocolDto } from './dto/protocol.dto';
import { ResponseTools } from '../common/utils/response-tools';

@Injectable()
export class ProtocolService {
  @InjectRepository(ProtocolEntity)
  private readonly protocolRepository: Repository<ProtocolEntity>;

  async create(createProtocol: ProtocolDto): Promise<boolean> {
    const protocol = await this.protocolRepository.save(createProtocol);

    if (!protocol) {
      return false;
    }

    return true;
  }

  async edit(editProtocol: ProtocolDto): Promise<boolean> {
    const { id, ...info } = editProtocol;

    const { affected } = await this.protocolRepository.update(id, info);
    return affected === 1;
  }

  async details(id: string): Promise<ProtocolEntity> {
    const protocol = await this.protocolRepository.findOneBy({ id });
    if (!protocol) {
      ResponseTools.fail('未找到对应详情数据!');
    }

    return protocol;
  }

  async getList(companyId: string): Promise<ProtocolEntity[]> {
    return await this.protocolRepository.findBy({ companyId });
  }
}
