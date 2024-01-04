import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProtocolEntity } from './entity/protocol.entity';
import { ProtocolController } from './protocol.controller';
import { ProtocolService } from './protocol.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProtocolEntity])],
  controllers: [ProtocolController],
  providers: [ProtocolService],
})
export class ProtocolModule {}
