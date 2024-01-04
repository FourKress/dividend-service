export enum ShareholderTypeEnum {
  AGENT_LEGAL_PERSON = 0,
  HOLDING_SHAREHOLDER,
  VIRTUAL_SHAREHOLDER,
  PRIMITIVE_SHAREHOLDER,
}

export enum ShareholderType2CnEnum {
  '代理法人' = ShareholderTypeEnum.AGENT_LEGAL_PERSON,
  '代持股东' = ShareholderTypeEnum.HOLDING_SHAREHOLDER,
  '模拟股东' = ShareholderTypeEnum.VIRTUAL_SHAREHOLDER,
  '原始股东' = ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER,
}
