import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsDecimal,
} from 'class-validator';
import { BooleanFlagEnum } from '../../common/enum';

export class CompanyAttributeDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  readonly attribute: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly holdShareholderFeeAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly actingLegalPersonFeeAmount: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(BooleanFlagEnum, { message: '参数$property不满足枚举值要求' })
  readonly checkFlag: BooleanFlagEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly settleInQuantity: string;

  @IsOptional()
  readonly invoiceAmount: number;

  @IsOptional()
  readonly transactionAmount: number;
}
