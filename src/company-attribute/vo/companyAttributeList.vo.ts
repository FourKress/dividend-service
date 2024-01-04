import { CompanyAttributeEntity } from '../entity/company-attribute.entity';

export interface ICompanyAttributeItem {
  value: string;
  label: string;
}

export class CompanyAttributeListVo {
  constructor(companyAttributeList: CompanyAttributeEntity[]) {
    this.records = companyAttributeList.map((d) => {
      const { id, attribute } = d;
      return {
        value: String(id),
        label: attribute,
      };
    });
  }
  readonly records: ICompanyAttributeItem[];
}
