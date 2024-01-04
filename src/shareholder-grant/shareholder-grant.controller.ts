import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ShareholderGrantService } from './shareholder-grant.service';
import {
  ShareholderGrantDto,
  ShareholderGrantPageDto,
  StaffGrantDetailPageDto,
  StaffGrantPageDto,
} from './dto';
import {
  ShareholderGrantPageVo,
  ShareholderGrantVo,
  StaffGrantDetailPageVo,
  StaffGrantPageVo,
} from './vo';

@Controller('shareholderGrant')
export class ShareholderGrantController {
  constructor(
    private readonly shareholderGrantService: ShareholderGrantService,
  ) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() createShareholderGrant: ShareholderGrantDto,
  ): Promise<boolean> {
    return await this.shareholderGrantService.create(createShareholderGrant);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<ShareholderGrantVo> {
    const grantDetails = await this.shareholderGrantService.details(id);
    return new ShareholderGrantVo(grantDetails);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: ShareholderGrantPageDto,
  ): Promise<ShareholderGrantPageVo> {
    const shareholderGrantPage = await this.shareholderGrantService.getPageList(
      pageSearch,
    );
    return new ShareholderGrantPageVo(shareholderGrantPage);
  }

  @Post('staffGrantPage')
  @HttpCode(HttpStatus.OK)
  async getStaffGrantPage(
    @Body() pageSearch: StaffGrantPageDto,
  ): Promise<StaffGrantPageVo> {
    const staffGrantPage = await this.shareholderGrantService.staffGrantPage(
      pageSearch,
    );
    return new StaffGrantPageVo(staffGrantPage);
  }

  @Post('staffGrantDetailPage')
  @HttpCode(HttpStatus.OK)
  async getStaffGrantDetailPage(
    @Body() pageSearch: StaffGrantDetailPageDto,
  ): Promise<StaffGrantDetailPageVo> {
    const page = await this.shareholderGrantService.staffGrantDetailPage(
      pageSearch,
    );
    return new StaffGrantDetailPageVo(page);
  }
}
