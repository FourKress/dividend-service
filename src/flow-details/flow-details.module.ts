import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlowDetailsEntity } from './entity/flowDetails.entity';
import { FlowDetailsController } from './flow-details.controller';
import { FlowDetailsService } from './flow-details.service';

@Module({
  imports: [TypeOrmModule.forFeature([FlowDetailsEntity])],
  controllers: [FlowDetailsController],
  providers: [FlowDetailsService],
  exports: [FlowDetailsService],
})
export class FlowDetailsModule {}
