import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MainCompanyController } from './main-company.controller';
import { MainCompanyService } from './main-company.service';

import { MainCompanyEntity } from './entity/main-company.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MainCompanyEntity])],
  controllers: [MainCompanyController],
  providers: [MainCompanyService],
  exports: [MainCompanyService],
})
export class MainCompanyModule {}
