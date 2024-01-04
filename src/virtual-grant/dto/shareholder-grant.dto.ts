import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class ShareholderGrantDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly authorizeTime: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly mainCompanyId: string;
}
