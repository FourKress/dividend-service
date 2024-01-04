import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { EnumService } from './enum.service';
import { JsonObject } from '../common/interfaces/json-object.interface';
import { EnumDto } from './dto/enum.dto';

@Controller('enum')
export class EnumController {
  constructor(private readonly enumService: EnumService) {}

  @Post('batch')
  @HttpCode(HttpStatus.OK)
  async findById(@Body() params: EnumDto): Promise<JsonObject> {
    return await this.enumService.batch(params.codes);
  }
}
