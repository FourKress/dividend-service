import { Entity, Column } from 'typeorm';

import { Base } from '../../common/entity/base.entity';

@Entity('users')
export class UserEntity extends Base {
  @Column({ comment: '用户手机号' })
  phoneNum: string;

  @Column({ comment: '用户名' })
  username: string;
}
