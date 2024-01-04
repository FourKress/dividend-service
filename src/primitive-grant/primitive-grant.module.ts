import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrimitiveGrantEntity } from './entity/primitive-grant.entity';
import { PrimitiveGrantController } from './primitive-grant.controller';
import { PrimitiveGrantService } from './primitive-grant.service';
import { ShareholderModule } from '../shareholder/shareholder.module';
import { MainCompanyModule } from '../main-company/main-company.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PrimitiveGrantEntity]),
    ShareholderModule,
    MainCompanyModule,
  ],
  controllers: [PrimitiveGrantController],
  providers: [PrimitiveGrantService],
  exports: [PrimitiveGrantService],
})
export class PrimitiveGrantModule {}
