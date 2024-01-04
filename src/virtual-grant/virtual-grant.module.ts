import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VirtualGrantEntity } from './entity/virtual-grant.entity';
import { VirtualGrantController } from './virtual-grant.controller';
import { VirtualGrantService } from './virtual-grant.service';
import { ShareholderModule } from '../shareholder/shareholder.module';

@Module({
  imports: [TypeOrmModule.forFeature([VirtualGrantEntity]), ShareholderModule],
  controllers: [VirtualGrantController],
  providers: [VirtualGrantService],
  exports: [VirtualGrantService],
})
export class VirtualGrantModule {}
