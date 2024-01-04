import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { VirtualGrantService } from './virtual-grant.service';
import { ShareholderGrantDto, VirtualGrantPageDto, EditBaseDto } from './dto';
import { VirtualGrantPageVo, ShareholderGrantVo } from './vo';
import { NoAuth } from '../common/decorators/no-auth.decorator';

@Controller('virtualGrant')
export class VirtualGrantController {
  constructor(private readonly virtualGrantService: VirtualGrantService) {}

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: VirtualGrantPageDto,
  ): Promise<VirtualGrantPageVo> {
    const proxyGrantPage = await this.virtualGrantService.getPageList(
      pageSearch,
    );
    return new VirtualGrantPageVo(proxyGrantPage);
  }

  @NoAuth()
  @Post('generateData')
  @HttpCode(HttpStatus.OK)
  async generateData(@Body('grantYears') grantYears: string): Promise<boolean> {
    return await this.virtualGrantService.generateData(grantYears);
  }

  @Post('shareholderGrant')
  @HttpCode(HttpStatus.OK)
  async shareholderGrant(
    @Body() grantParams: ShareholderGrantDto[],
  ): Promise<ShareholderGrantVo> {
    const grantList = await this.virtualGrantService.shareholderGrantBatch(
      grantParams,
    );
    return new ShareholderGrantVo(grantList);
  }

  @Post('editBase')
  @HttpCode(HttpStatus.OK)
  async editBase(@Body() editParams: EditBaseDto): Promise<boolean> {
    return await this.virtualGrantService.editBase(editParams);
  }
}
