import { CompanyAttributeEntity } from '../entity/company-attribute.entity';

export class CompanyAttributeVo {
  constructor(companyAttribute: CompanyAttributeEntity) {
    this.id = String(companyAttribute.id);
    this.attribute = companyAttribute.attribute;

    this.holdShareholderFeeAmount = companyAttribute.holdShareholderFeeAmount;
    this.actingLegalPersonFeeAmount =
      companyAttribute.actingLegalPersonFeeAmount;

    this.checkFlag = companyAttribute.checkFlag;
    this.settleInQuantity = companyAttribute.settleInQuantity;
    this.invoiceAmount = companyAttribute.invoiceAmount;
    this.transactionAmount = companyAttribute.transactionAmount;
  }
  readonly id: string;
  readonly attribute: string;

  readonly holdShareholderFeeAmount: number;
  readonly actingLegalPersonFeeAmount: number;
  readonly checkFlag: number;
  readonly settleInQuantity: string;
  readonly invoiceAmount: number;
  readonly transactionAmount: number;
}
