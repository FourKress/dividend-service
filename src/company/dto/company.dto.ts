import {
  IsNotEmpty,
  IsEnum,
  IsString,
  IsOptional,
  IsDecimal,
} from 'class-validator';
import { RegionEnum, CompanyStatusEnum } from '../../common/enum';

export class CompanyDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly name: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(CompanyStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly status: CompanyStatusEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  readonly attributeId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly subscriberAmount: number;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly businessLicenseTime: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly registeredAddress: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly writeOffTime: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly accountName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly accountNumber: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly accountBank: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly taxNumber: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly telephone: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly businessLicenseLegalFileId: string;
}
