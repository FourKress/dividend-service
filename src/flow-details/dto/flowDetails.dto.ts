import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class FlowDetailsDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly payer: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly jobNo: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly payDate: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly amount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly bankName: string;
}
