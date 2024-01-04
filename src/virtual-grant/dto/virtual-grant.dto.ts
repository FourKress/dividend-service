import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import {
  BooleanFlagEnum,
  GrantStatusEnum,
  RegionEnum,
} from '../../common/enum';

export class VirtualGrantDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly mainCompanyId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly mainCompanyName: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(BooleanFlagEnum, { message: '参数$property不满足枚举值要求' })
  readonly isNew: BooleanFlagEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(BooleanFlagEnum, { message: '参数$property不满足枚举值要求' })
  readonly isSharesTransfer: BooleanFlagEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantYears: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly authorizeTime: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly yearUnpaidGrantAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly yearAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly noDiscountBase: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly discountBase: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly awaitGrantBase: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly realGrantBase: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly unpaidGrantBase: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly awaitGrantAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly realGrantAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly unpaidGrantAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(GrantStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly grantStatus: GrantStatusEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly remark: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantTime: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly importTime: string;
}
