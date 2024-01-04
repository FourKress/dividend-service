import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareholderGrantController } from './shareholder-grant.controller';
import { ShareholderGrantService } from './shareholder-grant.service';
import { ShareholderGrantEntity } from './entity/shareholder-grant-entity';
import { VirtualGrantModule } from '../virtual-grant/virtual-grant.module';
import { PrimitiveGrantModule } from '../primitive-grant/primitive-grant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ShareholderGrantEntity]),
    VirtualGrantModule,
    PrimitiveGrantModule,
  ],
  controllers: [ShareholderGrantController],
  providers: [ShareholderGrantService],
})
export class ShareholderGrantModule {}
