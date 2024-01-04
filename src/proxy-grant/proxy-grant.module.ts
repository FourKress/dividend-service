import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProxyGrantEntity } from './entity/proxy-grant.entity';
import { ProxyGrantController } from './proxy-grant.controller';
import { ProxyGrantService } from './proxy-grant.service';
import { ShareholderModule } from '../shareholder/shareholder.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProxyGrantEntity]), ShareholderModule],
  controllers: [ProxyGrantController],
  providers: [ProxyGrantService],
})
export class ProxyGrantModule {}
