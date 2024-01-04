import { IShareholderItem } from '../interface/shareholderItem';

interface IBusinessLicenseGrantItem extends IShareholderItem {
  remark: '';
}

export class BusinessLicenseGrantVo {
  constructor(grantList: IShareholderItem[]) {
    this.records = grantList.map((d) => {
      const { id, company, staff, companyAttribute } = d;
      return {
        ...d,
        id: String(id),
        company: {
          ...company,
          id: String(company.id),
        },
        staff: {
          ...staff,
          id: String(staff.id),
        },
        companyAttribute: {
          ...companyAttribute,
          id: String(companyAttribute.id),
        },
        remark: '',
      };
    });
  }
  readonly records: IBusinessLicenseGrantItem[];
}
