import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Query,
} from '@nestjs/common';
import { ShareholderService } from './shareholder.service';
import {
  BusinessLicenseGrantDto,
  OfficeRecordsDto,
  ShareholderDto,
  ShareholderPageDto,
  ShareholderRecordsDto,
} from './dto';
import {
  CompanyShareholderDetailsVo,
  ShareholderPageVo,
  BusinessLicenseDetailsVo,
  StatisticsVo,
  OfficeRecordsVo,
  ShareholderRecordsVo,
  BusinessLicenseGrantVo,
} from './vo';

@Controller('shareholder')
export class ShareholderController {
  constructor(private readonly shareholderService: ShareholderService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createShareholder: ShareholderDto): Promise<boolean> {
    return await this.shareholderService.create(createShareholder);
  }

  @Post('proxy/create')
  @HttpCode(HttpStatus.OK)
  async proxyCreate(
    @Body() createProxyShareholder: ShareholderDto,
  ): Promise<boolean> {
    return await this.shareholderService.proxyCreate(createProxyShareholder);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(
    @Body('companyId') companyId: string,
  ): Promise<CompanyShareholderDetailsVo> {
    const shareholderList = await this.shareholderService.details(companyId);
    return new CompanyShareholderDetailsVo(shareholderList);
  }

  @Post('edit')
  @HttpCode(HttpStatus.OK)
  async edit(@Body() editProxyShareholder: ShareholderDto): Promise<boolean> {
    return await this.shareholderService.edit(editProxyShareholder);
  }

  @Post('proxy/edit')
  @HttpCode(HttpStatus.OK)
  async proxyEdit(@Body() editShareholder: ShareholderDto): Promise<boolean> {
    return await this.shareholderService.proxyEdit(editShareholder);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: ShareholderPageDto,
  ): Promise<ShareholderPageVo> {
    const records = await this.shareholderService.getPageList(pageSearch);
    return new ShareholderPageVo(records);
  }

  @Get('businessLicenseDetails')
  @HttpCode(HttpStatus.OK)
  async getBusinessLicenseDetails(
    @Query('companyId') companyId: string,
  ): Promise<BusinessLicenseDetailsVo> {
    const records = await this.shareholderService.getBusinessLicenseDetails(
      companyId,
    );
    return new BusinessLicenseDetailsVo(records);
  }

  @Get('statistics')
  @HttpCode(HttpStatus.OK)
  async getStatistics(
    @Query('companyId') companyId: string,
  ): Promise<StatisticsVo> {
    const records = await this.shareholderService.getStatistics(companyId);
    return new StatisticsVo(records);
  }

  @Post('officeRecords')
  @HttpCode(HttpStatus.OK)
  async getOfficeRecords(
    @Body() params: OfficeRecordsDto,
  ): Promise<OfficeRecordsVo> {
    const records = await this.shareholderService.getOfficeRecords(params);
    const officeRecords = await this.shareholderService.getHoldMonth(records);
    return new OfficeRecordsVo(officeRecords);
  }

  @Post('businessLicenseGrant')
  @HttpCode(HttpStatus.OK)
  async getBusinessLicenseGrant(
    @Body() grantParams: BusinessLicenseGrantDto,
  ): Promise<BusinessLicenseGrantVo> {
    const records = await this.shareholderService.getBusinessLicenseGrant(
      grantParams,
    );
    const officeRecords = await this.shareholderService.getHoldMonth(records);
    const grantRecords = await this.shareholderService.getGrantAmount(
      officeRecords,
    );
    return new BusinessLicenseGrantVo(grantRecords);
  }

  @Post('shareholderRecords')
  @HttpCode(HttpStatus.OK)
  async getShareholderByStaffId(
    @Body() pageSearch: ShareholderRecordsDto,
  ): Promise<ShareholderRecordsVo> {
    const records = await this.shareholderService.getShareholderByStaffId(
      pageSearch,
    );
    return new ShareholderRecordsVo(records);
  }
}
