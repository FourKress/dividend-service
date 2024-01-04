import { UserEntity } from '../entity/user.entity';

export class UserVo {
  constructor(user: UserEntity) {
    this.id = String(user.id);
    this.phoneNum = user.phoneNum;
    this.username = user.username;
  }
  readonly id: string;
  readonly phoneNum: string;
  readonly username: string;
}
