import { PageVo } from '../../common/vo/page.vo';
import { CompanyVo } from './company.vo';
import { ICompanyItem } from '../interface/companyItem';
import { ShareholderEntity } from '../../shareholder/entity/shareholder.entity';
import { StaffEntity } from '../../staff/entity/staff.entity';

class CompanyPageItem extends CompanyVo {
  constructor(company) {
    super(company);
    this.agentLegalPerson = company.agentLegalPerson;
    this.holdingShareholder = company.holdingShareholder;
    this.agentLegalPersonStaff = company.agentLegalPersonStaff;
    this.holdingShareholderStaff = company.holdingShareholderStaff;
    this.proxyGrantFlag = company.proxyGrant?.length <= 0;
  }
  readonly agentLegalPerson?: ShareholderEntity;
  readonly holdingShareholder?: ShareholderEntity;
  readonly agentLegalPersonStaff?: StaffEntity;
  readonly holdingShareholderStaff?: StaffEntity;
  readonly proxyGrantFlag: boolean;
}

export class CompanyPageVo extends PageVo<CompanyVo> {
  constructor(companyPage: PageVo<ICompanyItem>) {
    super(companyPage);
    const { records } = companyPage;
    this.records = records.map((d) => {
      return new CompanyPageItem(d);
    });
  }

  readonly records: CompanyPageItem[];
}
