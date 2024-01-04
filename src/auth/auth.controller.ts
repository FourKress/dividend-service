import {
  Controller,
  HttpStatus,
  HttpCode,
  Post,
  Body,
  Get,
  Query,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { IAuth } from './interfaces/auth.interface';
import { AuthDto } from './dto/auth.dto';
import { NoAuth } from '../common/decorators/no-auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @NoAuth()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() params: AuthDto): Promise<IAuth> {
    return await this.authService.login(params);
  }

  @NoAuth()
  @Post('smsCode')
  @HttpCode(HttpStatus.OK)
  public async getSmsCode(
    @Body('phoneNum') phoneNum: string,
  ): Promise<boolean> {
    return await this.authService.getSmsCode(phoneNum);
  }

  @NoAuth()
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  public async logout(@Query('userId') userId: string): Promise<boolean> {
    return await this.authService.logout(userId);
  }
}
