import { IsNotEmpty, IsString } from 'class-validator';

export class CompanyYearsSearchDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly years: string;
}
