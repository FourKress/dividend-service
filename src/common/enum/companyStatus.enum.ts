export enum CompanyStatusEnum {
  NORMAL = 0,
  AWAIT_WRITE_OFF,
  WRITE_OFF,
}

export enum CompanyStatus2CnEnum {
  '存续' = CompanyStatusEnum.NORMAL,
  '注销中' = CompanyStatusEnum.AWAIT_WRITE_OFF,
  '已注销' = CompanyStatusEnum.WRITE_OFF,
}
