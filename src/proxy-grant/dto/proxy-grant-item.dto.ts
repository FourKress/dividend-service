import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { ShareholderTypeEnum } from '../../common/enum';

export class ProxyGrantItemDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly shareholderId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyName: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  readonly shareholderType: ShareholderTypeEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly staffId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly staffName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly provideName: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly proxyStartTime: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly proxyEndTime: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly holdMonth: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantAmount: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantTime: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly remark: string;
}
