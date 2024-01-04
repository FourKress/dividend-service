import { CompanyYearsEntity } from '../entity/company-years.entity';

export class CompanyYearsVo {
  constructor(companyYears: CompanyYearsEntity) {
    this.id = String(companyYears.id);
    this.companyId = String(companyYears.companyId);
    this.years = companyYears.years;
    this.settleInQuantity = companyYears.settleInQuantity;
    this.invoiceAmount = companyYears.invoiceAmount;
    this.transactionAmount = companyYears.transactionAmount;
  }
  readonly id: string;
  readonly companyId: string;
  readonly years: string;
  readonly settleInQuantity: string;
  readonly invoiceAmount: number;
  readonly transactionAmount: number;
}
