import {
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  Timestamp,
} from 'typeorm';

const Moment = require('moment');

export const DateTransform = {
  to: (value: any) => value,
  from: (value: any) => Moment(value).format('YYYY-MM-DD HH:mm:ss'),
};

export const EnumTransform = (enumEntity: any) => {
  return {
    to: (value: any) => String(value),
    from: (value: any) => {
      if (value === '') return value;
      return {
        value: Number(value),
        label: enumEntity[value],
      };
    },
  };
};

export abstract class Base {
  // 主键id
  @PrimaryGeneratedColumn({ comment: 'ID主键' })
  id: string;

  // 创建时间
  @CreateDateColumn({ transformer: DateTransform, comment: '创建时间' })
  createTime: Timestamp;

  // 更新时间
  @UpdateDateColumn({ transformer: DateTransform, comment: '更新时间' })
  updateTime: Timestamp;

  // 软删除
  @Column({
    default: false,
    comment: '是否删除',
  })
  isDelete: boolean;
}
