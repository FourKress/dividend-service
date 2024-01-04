import { IsNumber } from 'class-validator';

export class PageDto {
  @IsNumber({ allowNaN: false }, { message: '参数$property格式错误' })
  readonly size: number;

  @IsNumber({ allowNaN: false }, { message: '参数$property格式错误' })
  readonly current: number;
}
