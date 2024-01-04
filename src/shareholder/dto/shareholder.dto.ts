import { IsArray, IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { AgentLegalPersonDto } from './agentLegalPerson.dto';
import { HoldingShareholderDto } from './holdingShareholder.dto';
import { VirtualShareholderDto } from './virtualShareholder.dto';
import { PrimitiveShareholderDto } from './primitiveShareholder.dto';

export class ShareholderDto {
  @IsOptional()
  @IsObject({ message: '参数$property格式错误' })
  @ValidateNested()
  @Type(() => AgentLegalPersonDto)
  readonly agentLegalPerson?: AgentLegalPersonDto;

  @IsOptional()
  @IsObject({ message: '参数$property格式错误' })
  @ValidateNested()
  @Type(() => HoldingShareholderDto)
  readonly holdingShareholder?: HoldingShareholderDto;

  @IsOptional()
  @IsArray({ message: '参数$property格式错误' })
  @ValidateNested({ each: true })
  @Type(() => VirtualShareholderDto)
  readonly virtualShareholder?: VirtualShareholderDto[];

  @IsOptional()
  @IsArray({ message: '参数$property格式错误' })
  @ValidateNested({ each: true })
  @Type(() => PrimitiveShareholderDto)
  readonly primitiveShareholder?: PrimitiveShareholderDto[];
}
