import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';

import { CompanyService } from './company.service';
import { CompanyDto, CompanyPageDto } from './dto';
import { CompanyPageVo, CompanyVo } from './vo';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createCompany: CompanyDto): Promise<boolean> {
    return await this.companyService.create(createCompany);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<CompanyVo> {
    const company = await this.companyService.details(id);
    return new CompanyVo(company);
  }

  @Post('editBasicInfo')
  @HttpCode(HttpStatus.OK)
  async editBasicInfo(@Body() editBasicInfo: CompanyDto): Promise<boolean> {
    return await this.companyService.editBasicInfo(editBasicInfo);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: CompanyPageDto,
  ): Promise<CompanyPageVo> {
    const companyPage = await this.companyService.getPageList(pageSearch);
    return new CompanyPageVo(companyPage);
  }
}
