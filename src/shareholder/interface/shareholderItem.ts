import { ShareholderEntity } from '../entity/shareholder.entity';
import { StaffEntity } from '../../staff/entity/staff.entity';
import { CompanyEntity } from '../../company/entity/company.entity';
import { CompanyAttributeEntity } from '../../company-attribute/entity/company-attribute.entity';
import { CompanyYearsEntity } from '../../company-years/entity/company-years.entity';

export interface IShareholderItem extends ShareholderEntity {
  staff?: StaffEntity;
  company?: CompanyEntity;
  companyAttribute?: CompanyAttributeEntity;
  companyYears?: CompanyYearsEntity;
  holdMonth?: number;
  grantAmount?: string;
}
