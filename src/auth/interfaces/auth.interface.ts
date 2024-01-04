import { UserEntity } from '../../user/entity/user.entity';

export class IAuth {
  token: string;
  userInfo: UserEntity;
}
