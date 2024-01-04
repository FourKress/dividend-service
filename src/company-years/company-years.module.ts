import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyYearsEntity } from './entity/company-years.entity';

import { CompanyYearsController } from './company-years.controller';
import { CompanyYearsService } from './company-years.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyYearsEntity])],
  controllers: [CompanyYearsController],
  providers: [CompanyYearsService],
  exports: [CompanyYearsService],
})
export class CompanyYearsModule {}
