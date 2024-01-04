import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  IsDecimal,
} from 'class-validator';
import {
  RegionEnum,
  CompanyStatusEnum,
  BooleanFlagEnum,
} from '../../common/enum';

export class MainCompanyDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly name: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyBody: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(CompanyStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly status: CompanyStatusEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(BooleanFlagEnum, { message: '参数$property不满足枚举值要求' })
  readonly isNew: BooleanFlagEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(BooleanFlagEnum, { message: '参数$property不满足枚举值要求' })
  readonly isSharesTransfer: BooleanFlagEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly securityDepositAmount: number;
}
