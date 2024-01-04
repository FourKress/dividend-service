import { IsNotEmpty, IsString, IsOptional, IsDecimal } from 'class-validator';

export class CompanyYearsDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly years: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly settleInQuantity: string;

  @IsOptional()
  readonly invoiceAmount: number;

  @IsOptional()
  readonly transactionAmount: number;
}
