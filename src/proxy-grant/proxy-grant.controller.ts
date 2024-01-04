import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { ProxyGrantService } from './proxy-grant.service';
import { ProxyGrantDto, ProxyGrantPageDto } from './dto';
import { ProxyGrantPageVo, ProxyGrantVo } from './vo';

@Controller('proxyGrant')
export class ProxyGrantController {
  constructor(private readonly proxyGrantService: ProxyGrantService) {}

  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(@Body() createProxyGrant: ProxyGrantDto): Promise<boolean> {
    return await this.proxyGrantService.create(createProxyGrant);
  }

  @Post('details')
  @HttpCode(HttpStatus.OK)
  async details(@Body('id') id: string): Promise<ProxyGrantVo> {
    const grantDetails = await this.proxyGrantService.details(id);
    return new ProxyGrantVo(grantDetails);
  }

  @Post('page')
  @HttpCode(HttpStatus.OK)
  async getPageList(
    @Body() pageSearch: ProxyGrantPageDto,
  ): Promise<ProxyGrantPageVo> {
    const proxyGrantPage = await this.proxyGrantService.getPageList(pageSearch);
    return new ProxyGrantPageVo(proxyGrantPage);
  }
}
