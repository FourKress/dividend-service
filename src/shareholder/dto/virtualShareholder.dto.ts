import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ShareholderBaseDto } from './shareholderBase.dto';

export class VirtualShareholderDto extends ShareholderBaseDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly shareholderRatio: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly authorizeTime: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly discountBase: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly noDiscountBase: string;
}
