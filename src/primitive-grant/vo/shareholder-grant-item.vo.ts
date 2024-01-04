import { Region2CnEnum } from '../../common/enum';
import { IShareholderGrantItem } from '../interface/IShareholder-grant-item';
import { JsonObject } from '../../common/interfaces/json-object.interface';

export class ShareholderGrantItemVo {
  constructor(shareholderGrantItem: IShareholderGrantItem) {
    const { dividendRatio, awaitGrantBase, realGrantBase, region } =
      shareholderGrantItem;
    this.mainCompanyId = shareholderGrantItem.mainCompanyId;
    this.mainCompanyName = shareholderGrantItem.mainCompanyName;

    this.region = '';
    if (region !== '') {
      this.region = {
        label: Region2CnEnum[String(region)],
        value: Number(region),
      };
    }

    this.staffId = String(shareholderGrantItem.staffId);
    this.staffName = shareholderGrantItem.staffName;
    this.jobNo = shareholderGrantItem.jobNo;
    this.dividendRatio = dividendRatio;

    this.shareholderId = String(shareholderGrantItem.shareholderId);
    this.grantId = String(shareholderGrantItem.grantId);
    this.awaitGrantBase = awaitGrantBase;
    this.realGrantBase = realGrantBase;

    const awaitGrantAmount = awaitGrantBase * (dividendRatio / 100);
    const realGrantAmount = realGrantBase * (dividendRatio / 100);

    const unpaidGrantAmount = awaitGrantAmount - realGrantAmount;

    this.awaitGrantAmount = awaitGrantAmount.toFixed(2);
    this.realGrantAmount = realGrantAmount.toFixed(2);
    this.unpaidGrantAmount = unpaidGrantAmount.toFixed(2);
  }

  readonly mainCompanyId: string;
  readonly mainCompanyName: string;
  readonly region: JsonObject | string;

  readonly staffId: string;
  readonly staffName: string;
  readonly jobNo: string;

  readonly shareholderId: string;
  readonly dividendRatio: number;

  readonly grantId: string;
  readonly awaitGrantBase: number;
  readonly realGrantBase: number;

  readonly authorizeTime: string;

  readonly awaitGrantAmount: string;
  readonly realGrantAmount: string;
  readonly unpaidGrantAmount: string;
}
