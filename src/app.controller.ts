import { Controller, Get } from '@nestjs/common';
import { NoAuth } from 'common/decorators/no-auth.decorator';

@Controller()
export class AppController {
  @NoAuth()
  @Get('/')
  get() {
    return '';
  }
}
