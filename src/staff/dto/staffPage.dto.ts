import { IsEnum, IsString, IsOptional } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';

import {
  RegionEnum,
  EmployeeAttributeEnum,
  ShareholderTypeEnum,
} from '../../common/enum';

export class StaffPageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly name: string;

  @IsOptional()
  @IsEnum(EmployeeAttributeEnum, { message: '参数$property不满足枚举值要求' })
  readonly employeeAttribute: EmployeeAttributeEnum;

  @IsOptional()
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;

  // @IsOptional()
  // @IsEnum(ShareholderTypeEnum, { message: '参数$property不满足枚举值要求' })
  // readonly shareholderType: ShareholderTypeEnum;
}
