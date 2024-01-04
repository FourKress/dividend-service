import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

import { ShareholderBaseDto } from './shareholderBase.dto';
import { ShareholderTypeEnum } from '../../common/enum';

export class OfficeRecordsDto extends ShareholderBaseDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  readonly shareholderType: ShareholderTypeEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly staffId: string;

  @IsOptional()
  @IsBoolean({ message: '参数$property格式错误' })
  readonly isDelete: boolean;
}
