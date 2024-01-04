import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ShareholderTypeEnum } from '../../common/enum';
import { PageDto } from '../../common/dto/page.dto';

export class ShareholderPageDto extends PageDto {
  @IsOptional()
  @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  readonly shareholderType: ShareholderTypeEnum;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly companyId: string;
}
