import { Controller, Post, HttpStatus, HttpCode, Body } from '@nestjs/common';

import { MainCompanyService } from './main-company.service';
import { MainCompanyDto, MainCompanyPageDto } from './dto';
import { MainCompanyPageVo, MainCompanyVo } from './vo';

@Controller('mainCompany')
export class MainCompanyController {
  constructor(private readonly mainCompanyService: MainCompanyService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createMainCompany: MainCompanyDto): Promise<boolean> {
    return await this.mainCompanyService.create(createMainCompany);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<MainCompanyVo> {
    const mainCompany = await this.mainCompanyService.details(id);
    return new MainCompanyVo(mainCompany);
  }

  @Post('editBasicInfo')
  @HttpCode(HttpStatus.OK)
  async editBasicInfo(@Body() editBasicInfo: MainCompanyDto): Promise<boolean> {
    return await this.mainCompanyService.editBasicInfo(editBasicInfo);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: MainCompanyPageDto,
  ): Promise<MainCompanyPageVo> {
    const mainCompanyPage = await this.mainCompanyService.getPageList(
      pageSearch,
    );
    return new MainCompanyPageVo(mainCompanyPage);
  }
}
