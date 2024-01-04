import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsEnum,
  IsDecimal,
  IsBoolean,
} from 'class-validator';
import { ShareholderTypeEnum } from '../../common/enum';

export class ShareholderBaseDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly staffId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  readonly shareholderType: ShareholderTypeEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsBoolean({ message: '参数$property格式错误' })
  readonly isDelete: boolean;
}
