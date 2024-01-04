import {
  Controller,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Body,
} from '@nestjs/common';

import { FlowDetailsService } from './flow-details.service';
import { FlowDetailsPageDto } from './dto/flowDetailsPage.dto';
import { FlowDetailsDto } from './dto/flowDetails.dto';
import { FlowDetailsVo, FlowDetailsPageVo } from './vo';
import { NoAuth } from '../common/decorators/no-auth.decorator';

@Controller('flowDetails')
export class FlowDetailsController {
  constructor(private readonly flowDetailsService: FlowDetailsService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createFlowDetails: FlowDetailsDto): Promise<boolean> {
    return await this.flowDetailsService.create(createFlowDetails);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<FlowDetailsVo> {
    const company = await this.flowDetailsService.details(id);
    return new FlowDetailsVo(company);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: FlowDetailsPageDto,
  ): Promise<FlowDetailsPageVo> {
    const flowDetailsPage = await this.flowDetailsService.getPageList(
      pageSearch,
    );
    return new FlowDetailsPageVo(flowDetailsPage);
  }
}
