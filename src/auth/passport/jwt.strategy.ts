import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { JwtService } from './jwt.service';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly jwtService: JwtService,
    configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      passReqToCallback: true,
      secretOrKey: configService.get('auth.secretOrKey'),
    });
  }

  public async validate(payload: JwtPayload, req: any, done: any) {
    const user = await this.jwtService.validateUser(req);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }
}
