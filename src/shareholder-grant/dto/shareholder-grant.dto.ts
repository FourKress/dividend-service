import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ShareholderGrantItemDto } from './shareholder-grant-item.dto';
import { Type } from 'class-transformer';
import { ShareholderTypeEnum } from '../../common/enum';

export class ShareholderGrantDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  readonly shareholderType: ShareholderTypeEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly grantTime: string;

  @IsArray({ message: '参数$property格式错误' })
  @ValidateNested({ each: true })
  @Type(() => ShareholderGrantItemDto)
  readonly grantList: ShareholderGrantItemDto[];
}
