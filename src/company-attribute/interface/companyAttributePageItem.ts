import { CompanyEntity } from '../../company/entity/company.entity';
import { CompanyAttributeEntity } from '../entity/company-attribute.entity';

export interface ICompanyAttributePageItem extends CompanyAttributeEntity {
  company?: CompanyEntity[];
  companyQuantity: number;
}
