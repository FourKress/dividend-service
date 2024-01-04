import { IsEnum, IsOptional, IsString } from 'class-validator';
import { RegionEnum } from '../../common/enum';
import { PageDto } from '../../common/dto/page.dto';

export class StaffGrantPageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly staffName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly grantYears: string;

  @IsOptional()
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;
}
