import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class EditBaseDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly id: string;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly realGrantBase: number;
}
