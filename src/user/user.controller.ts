import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { NoAuth } from '../common/decorators/no-auth.decorator';

import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';
import { UserVo } from './vo/user.vo';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @NoAuth()
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createUser(@Body() createUser: UserDto): Promise<UserVo> {
    const user = await this.userService.createUser(createUser);
    return new UserVo(user);
  }

  @Post('info')
  @HttpCode(HttpStatus.OK)
  async findById(@Body('id') id: string): Promise<UserVo> {
    const user = await this.userService.findById(id);
    return new UserVo(user);
  }
}
