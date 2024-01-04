import { ShareholderBaseDto } from './shareholderBase.dto';
import { IsDecimal, IsNotEmpty } from 'class-validator';

export class PrimitiveShareholderDto extends ShareholderBaseDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly dividendRatio: number;
}
