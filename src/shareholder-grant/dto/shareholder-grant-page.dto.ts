import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ShareholderTypeEnum } from '../../common/enum';
import { PageDto } from '../../common/dto/page.dto';

export class ShareholderGrantPageDto extends PageDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  readonly shareholderType: ShareholderTypeEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly mainCompanyName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly staffId: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantTimeStart: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantTimeEnd: string;
}
