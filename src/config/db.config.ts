import { DataSourceOptions } from 'typeorm';

const DBConfig: DataSourceOptions = {
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  type: 'mysql',
  // 如果查询执行时间超过此给定的最大执行时间（以毫秒为单位），则 logger 将记录此查询
  maxQueryExecutionTime: 2000,
  // 开起日志
  logger: 'advanced-console',
  // 处理数据库中的大数字（BIGINT和DECIMAL列）时，应启用此选项
  supportBigNumbers: true,
  // 同时启用supportBigNumbers和bigNumberStrings会强制将大数字（BIGINT和DECIMAL列）作为 JavaScript String 对象返回
  bigNumberStrings: true,
  // 强制日期类型（TIMESTAMP，DATETIME，DATE）作为字符串返回
  dateStrings: true,
  synchronize: true,
  entities: [__dirname + '/**/entity/*{.js,.ts}'],
};

export default DBConfig;
