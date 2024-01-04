import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class BusinessLicenseGrantDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantYears: string;

  @IsArray({ message: '参数$property格式错误' })
  readonly companyIds: string[];
}
