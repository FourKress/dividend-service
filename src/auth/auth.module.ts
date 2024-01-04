import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import AuthConfig from '../config/auth.config';
import { JwtStrategy } from './passport/jwt.strategy';

import { JwtService } from './passport/jwt.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';

@Module({
  imports: [ConfigModule.forFeature(AuthConfig), UserModule],
  controllers: [AuthController],
  providers: [JwtService, JwtStrategy, AuthService],
})
export class AuthModule {}
