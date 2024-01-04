import { PageVo } from '../../common/vo/page.vo';
import { ICompanyAttributePageItem } from '../interface/companyAttributePageItem';
import { CompanyAttributePageItemVo } from './companyAttributePageItem.vo';

export class CompanyAttributePageVo extends PageVo<CompanyAttributePageItemVo> {
  constructor(companyAttributePage: PageVo<ICompanyAttributePageItem>) {
    super(companyAttributePage);
    const { records } = companyAttributePage;
    this.records = records.map((d) => {
      return new CompanyAttributePageItemVo(d);
    });
  }

  readonly records: CompanyAttributePageItemVo[];
}
