import { IsString, IsOptional } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';

export class ProxyGrantPageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly companyName: string;

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
