import { IsNotEmpty, IsString } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';

export class ShareholderRecordsDto extends PageDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly staffId: string;
}
