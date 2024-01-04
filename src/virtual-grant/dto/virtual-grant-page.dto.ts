import { IsString, IsOptional, IsEnum } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';
import { GrantStatusEnum, RegionEnum } from '../../common/enum';

export class VirtualGrantPageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly mainCompanyName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly companyBody: string;

  @IsOptional()
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantYears: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantTimeStart: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantTimeEnd: string;

  @IsOptional()
  @IsEnum(GrantStatusEnum, { message: '参数$property不满足枚举值要求' })
  readonly grantStatus: GrantStatusEnum;
}
