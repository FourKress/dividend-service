import { ICompanyAttributePageItem } from '../interface/companyAttributePageItem';
import { CompanyAttributeVo } from './companyAttribute.vo';

export class CompanyAttributePageItemVo extends CompanyAttributeVo {
  constructor(companyAttribute: ICompanyAttributePageItem) {
    super(companyAttribute);
    this.companyQuantity = companyAttribute?.company?.length ?? 0;
  }
  readonly companyQuantity: number;
}
