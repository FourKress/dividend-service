import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PrimitiveGrantService } from './primitive-grant.service';
import { ShareholderGrantDto, PrimitiveGrantPageDto } from './dto';
import { PrimitiveGrantPageVo, ShareholderGrantVo } from './vo';

@Controller('primitiveGrant')
export class PrimitiveGrantController {
  constructor(private readonly primitiveGrantService: PrimitiveGrantService) {}

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: PrimitiveGrantPageDto,
  ): Promise<PrimitiveGrantPageVo> {
    const proxyGrantPage = await this.primitiveGrantService.getPageList(
      pageSearch,
    );
    return new PrimitiveGrantPageVo(proxyGrantPage);
  }

  @Post('shareholderGrant')
  @HttpCode(HttpStatus.OK)
  async shareholderGrant(
    @Body() grantParams: ShareholderGrantDto[],
  ): Promise<ShareholderGrantVo> {
    const grantList = await this.primitiveGrantService.shareholderGrantBatch(
      grantParams,
    );
    return new ShareholderGrantVo(grantList);
  }
}
