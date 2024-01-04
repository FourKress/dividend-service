import { IsArray, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { ProxyGrantItemDto } from './proxy-grant-item.dto';
import { Type } from 'class-transformer';

export class ProxyGrantDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantTime: string;

  @IsArray({ message: '参数$property格式错误' })
  @ValidateNested({ each: true })
  @Type(() => ProxyGrantItemDto)
  readonly grantList: ProxyGrantItemDto[];
}
