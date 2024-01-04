import { Controller, HttpStatus, Post, HttpCode, Body } from '@nestjs/common';
import { ProtocolService } from './protocol.service';
import { ProtocolDto } from './dto/protocol.dto';
import { ProtocolVo, ProtocolListVo } from './vo';

@Controller('protocol')
export class ProtocolController {
  constructor(private readonly protocolService: ProtocolService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createProtocol: ProtocolDto): Promise<boolean> {
    return await this.protocolService.create(createProtocol);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body() createProtocol: ProtocolDto): Promise<boolean> {
    return await this.protocolService.edit(createProtocol);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<ProtocolVo> {
    const protocol = await this.protocolService.details(id);
    return new ProtocolVo(protocol);
  }

  @Post('list')
  @HttpCode(HttpStatus.OK)
  async getList(@Body('companyId') companyId: string): Promise<ProtocolListVo> {
    const protocol = await this.protocolService.getList(companyId);
    return new ProtocolListVo(protocol);
  }
}
