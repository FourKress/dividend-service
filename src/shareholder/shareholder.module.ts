import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShareholderController } from './shareholder.controller';
import { ShareholderService } from './shareholder.service';

import { ShareholderEntity } from './entity/shareholder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareholderEntity])],
  controllers: [ShareholderController],
  providers: [ShareholderService],
  exports: [ShareholderService],
})
export class ShareholderModule {}
