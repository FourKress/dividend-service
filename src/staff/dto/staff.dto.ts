import { IsNotEmpty, IsEnum, IsString, IsOptional } from 'class-validator';
import { RegionEnum, EmployeeAttributeEnum } from '../../common/enum';

export class StaffDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly name: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly jobNo: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly position: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly rank: string;

  @IsOptional()
  @IsEnum(EmployeeAttributeEnum, { message: '参数$property不满足枚举值要求' })
  readonly employeeAttribute: EmployeeAttributeEnum;

  @IsOptional()
  @IsEnum(RegionEnum, { message: '参数$property不满足枚举值要求' })
  readonly region: RegionEnum;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly companyName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly idCardNo: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly age: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly phoneNum: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly address: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly idCardFrontFileId: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly idCardBackFileId: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly bankName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly accountName: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly account: string;
}
