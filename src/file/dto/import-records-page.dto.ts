import { IsEnum, IsString, IsOptional, IsNotEmpty } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';

import { ImportStatusEnum } from '../../common/enum';

export class ImportRecordsPageDto extends PageDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly templateCode: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly fileName: string;

  @IsOptional()
  @IsEnum(ImportStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly importStatus: ImportStatusEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly importTimeStart: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly importTimeEnd: string;
}
