import { IsNotEmpty, IsString } from 'class-validator';

export class EnumDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ each: true, message: '参数$property格式错误' })
  codes: string[];
}
