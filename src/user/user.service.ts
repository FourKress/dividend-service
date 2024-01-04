import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from './entity/user.entity';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUser: UserDto): Promise<UserEntity> {
    const user = await this.userRepository.save(createUser);
    return user;
  }

  async findOne(phoneNum: string): Promise<UserEntity> {
    return await this.userRepository.findOneBy({
      phoneNum,
      isDelete: false,
    });
  }

  async findByPhoneNum(phoneNum: string): Promise<any> {
    return await this.userRepository.findOneBy({
      isDelete: false,
      phoneNum,
    });
  }

  async findById(userId: string): Promise<any> {
    return await this.userRepository.findOne({
      where: {
        id: userId,
        isDelete: false,
      },
    });
  }
}
