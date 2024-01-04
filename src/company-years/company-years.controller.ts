import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CompanyYearsService } from './company-years.service';
import { CompanyYearsVo } from './vo/company-years.vo';
import { CompanyYearsDto, CompanyYearsSearchDto } from './dto';

@Controller('companyYears')
export class CompanyYearsController {
  constructor(private readonly companyYearsService: CompanyYearsService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createCompanyYears: CompanyYearsDto): Promise<boolean> {
    return await this.companyYearsService.create(createCompanyYears);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body() editCompanyYears: CompanyYearsDto): Promise<boolean> {
    return await this.companyYearsService.edit(editCompanyYears);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<CompanyYearsVo> {
    const companyYears = await this.companyYearsService.details(id);
    return new CompanyYearsVo(companyYears);
  }

  @Post('search')
  @HttpCode(HttpStatus.OK)
  async search(@Body() params: CompanyYearsSearchDto): Promise<CompanyYearsVo> {
    const companyYears = await this.companyYearsService.search(params);
    return new CompanyYearsVo(companyYears);
  }
}
