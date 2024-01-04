import { IsEnum, IsString, IsOptional } from 'class-validator';
import { RegionEnum, CompanyStatusEnum } from '../../common/enum';
import { PageDto } from '../../common/dto/page.dto';

export class MainCompanyPageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly name: string;

  @IsOptional()
  @IsEnum(CompanyStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly status: CompanyStatusEnum;

  @IsOptional()
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;
}
