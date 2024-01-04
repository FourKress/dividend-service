import { IsString, IsNotEmpty, IsOptional, IsEnum } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';
import { ImportStatusEnum } from '../../common/enum';

export class ImportDetailsPageDto extends PageDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly fileId: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly templateCode: string;

  @IsOptional()
  @IsEnum(ImportStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly importStatus: ImportStatusEnum;
}
