import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompanyAttributeController } from './company-attribute.controller';
import { CompanyAttributeService } from './company-attribute.service';

import { CompanyAttributeEntity } from './entity/company-attribute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyAttributeEntity])],
  controllers: [CompanyAttributeController],
  providers: [CompanyAttributeService],
  exports: [CompanyAttributeService],
})
export class CompanyAttributeModule {}
