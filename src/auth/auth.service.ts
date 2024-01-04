import { Injectable } from '@nestjs/common';

import { JwtService } from './passport/jwt.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';
import { IAuth } from './interfaces/auth.interface';

import { SendSms } from '../sms';
import { ResponseTools } from '../common/utils/response-tools';

const Moment = require('moment');

@Injectable()
export class AuthService {
  private smsMap: Map<string, string>;

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UserService,
  ) {
    this.smsMap = new Map();
  }

  async login(params: AuthDto): Promise<IAuth> {
    const { smsCode, phoneNum } = params;
    const smsData = JSON.parse(this.smsMap.get(phoneNum) ?? '{}');
    const { code, expiredTime } = smsData;
    if (!expiredTime || Moment().diff(expiredTime) > 0) {
      ResponseTools.fail('验证码已过期');
      return;
    }
    if (smsCode !== code) {
      ResponseTools.fail('验证码错误');
      return;
    }
    const userFromDB = await this.usersService.findOne(phoneNum);
    if (!userFromDB) {
      ResponseTools.fail('手机号或验证码错误');
    }
    this.smsMap.delete(phoneNum);
    const token = await this.jwtService.createToken(userFromDB);

    return {
      token,
      userInfo: userFromDB,
    };
  }

  async getSmsCode(phoneNum: string): Promise<boolean> {
    const userFromDB = await this.usersService.findByPhoneNum(phoneNum);
    if (!userFromDB) {
      ResponseTools.fail('该手机号还不是系统用户');
    }
    const code = String(Math.random()).substring(2, 8);
    this.smsMap.delete(phoneNum);
    this.smsMap.set(
      phoneNum,
      JSON.stringify({
        code,
        expiredTime: Moment().add("5", "minutes").valueOf()
      })
    );

    try {
      await SendSms(phoneNum, code);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async logout(userId: string): Promise<boolean> {
    return await this.jwtService.deleteToken(userId);
  }
}
