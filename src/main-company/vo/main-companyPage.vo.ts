import { PageVo } from '../../common/vo/page.vo';
import { MainCompanyVo } from './main-company.vo';
import { MAX_VIRTUAL_SHAREHOLDER_RATIO } from '../../common/constant';
import { MainCompanyEntity } from '../entity/main-company.entity';

class MainCompanyPageItem extends MainCompanyVo {
  constructor(mainCompany) {
    super(mainCompany);

    const { virtualShareholder } = mainCompany;
    let virtualShareRatio = 0;
    if (virtualShareholder) {
      virtualShareholder.forEach((d) => {
        virtualShareRatio += Number(d.shareholderRatio);
      });
    }

    this.virtualShareRatio = virtualShareRatio.toFixed(2);
    this.virtualShareSurplusRatio = (
      MAX_VIRTUAL_SHAREHOLDER_RATIO - virtualShareRatio
    ).toFixed(2);
  }
  readonly virtualShareRatio?: string;
  readonly virtualShareSurplusRatio?: string;
}

export class MainCompanyPageVo extends PageVo<MainCompanyVo> {
  constructor(companyPage: PageVo<MainCompanyEntity>) {
    super(companyPage);
    const { records } = companyPage;
    this.records = records.map((d) => {
      return new MainCompanyPageItem(d);
    });
  }

  readonly records: MainCompanyPageItem[];
}
