import * as jwt from 'jsonwebtoken';

import { Injectable } from '@nestjs/common';

import { UserEntity } from '../../user/entity/user.entity';
import { ConfigService } from '@nestjs/config';
import { ResponseTools } from '../../common/utils/response-tools';

@Injectable()
export class JwtService {
  private tokenMap: Map<string, string>;

  constructor(private readonly configService: ConfigService) {
    this.tokenMap = new Map();
  }

  async createToken(user: UserEntity): Promise<string> {
    const expiresIn = this.configService.get('auth.expiresIn'),
      secretOrKey = this.configService.get('auth.secretOrKey');

    const token = jwt.sign({ ...user }, secretOrKey, { expiresIn });
    await this.tokenMap.set(user.id, token);
    return token;
  }

  async deleteToken(userId): Promise<boolean> {
    try {
      this.tokenMap.delete(userId);
      return true;
    } catch (e) {
      console.log(e);
      ResponseTools.fail('退出登录失败');
      return false;
    }
  }

  async validateUser(signedUser): Promise<UserEntity | null> {
    if (signedUser) {
      return signedUser;
    }
    return null;
  }
}
