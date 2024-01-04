import { IsString, IsOptional } from 'class-validator';
import { PageDto } from '../../common/dto/page.dto';

export class FlowDetailsPageDto extends PageDto {
  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly payer: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly payDateStart: string;

  @IsOptional()
  @IsString({ message: '参数$property格式错误' })
  readonly payDateEnd: string;
}
