import {
  Controller,
  Post,
  Get,
  HttpStatus,
  HttpCode,
  Body,
  Query,
} from '@nestjs/common';
import { CompanyAttributeService } from './company-attribute.service';
import { CompanyAttributePageDto, CompanyAttributeDto } from './dto';
import {
  CompanyAttributePageVo,
  CompanyAttributeVo,
  CompanyAttributeListVo,
} from './vo';

@Controller('companyAttribute')
export class CompanyAttributeController {
  constructor(
    private readonly companyAttributeService: CompanyAttributeService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() companyAttributeService: CompanyAttributeDto,
  ): Promise<boolean> {
    return await this.companyAttributeService.create(companyAttributeService);
  }

  @Get('delete')
  async delete(@Query('id') id: string): Promise<boolean> {
    return await this.companyAttributeService.delete(id);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  async edit(
    @Body() editCompanyAttribute: CompanyAttributeDto,
  ): Promise<boolean> {
    return await this.companyAttributeService.edit(editCompanyAttribute);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<CompanyAttributeVo> {
    const companyAttribute = await this.companyAttributeService.details(id);
    return new CompanyAttributeVo(companyAttribute);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: CompanyAttributePageDto,
  ): Promise<CompanyAttributePageVo> {
    const pageList = await this.companyAttributeService.getPageList(pageSearch);
    return new CompanyAttributePageVo(pageList);
  }

  @Get('list')
  async getList(): Promise<CompanyAttributeListVo> {
    const records = await this.companyAttributeService.getList();
    return new CompanyAttributeListVo(records);
  }
}
