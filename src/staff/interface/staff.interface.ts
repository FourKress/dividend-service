import { StaffEntity } from '../entity/staff.entity';
import { CompanyEntity } from '../../company/entity/company.entity';
import { ShareholderEntity } from '../../shareholder/entity/shareholder.entity';
import { FlowDetailsEntity } from '../../flow-details/entity/flowDetails.entity';
import { MainCompanyEntity } from '../../main-company/entity/main-company.entity';

export interface IStaffPageItem extends StaffEntity {
  shareholderType?: string;
  companyQuantity?: number;
  company?: CompanyEntity[];
  mainCompany?: MainCompanyEntity[];
  shareholder?: ShareholderEntity[];
  flowDetailsList?: FlowDetailsEntity[];
}
