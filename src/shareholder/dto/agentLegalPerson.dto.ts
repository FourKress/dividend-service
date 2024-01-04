import { IsDecimal, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ShareholderBaseDto } from './shareholderBase.dto';

export class AgentLegalPersonDto extends ShareholderBaseDto {
  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsDecimal({ message: '参数$property格式错误' })
  readonly shareholderRatio: number;

  @IsNotEmpty({ message: '参数$property不能为空' })
  @IsString({ message: '参数$property格式错误' })
  readonly proxyStartTime: string;
}
