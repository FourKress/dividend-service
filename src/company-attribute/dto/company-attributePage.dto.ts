import { IsOptional, IsString } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';

export class CompanyAttributePageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly attribute: string;
}
