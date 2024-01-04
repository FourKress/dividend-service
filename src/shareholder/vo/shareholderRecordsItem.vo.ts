import { ShareholderTypeEnum } from '../../common/enum';
import { IShareholderRecordsItem } from '../interface/shareholderRecordsItem';
import { Timestamp } from 'typeorm';

export class ShareholderRecordsItemVo {
  constructor(shareholder: IShareholderRecordsItem) {
    const {
      shareholderType,
      company,
      createTime,
      shareholderRatio,
      dividendRatio,
    } = shareholder;
    const value = shareholderType['value'] as number;

    this.companyName = company.name;
    this.createTime = createTime;
    this.shareholderType = shareholderType;
    this.ratio = value === 3 ? dividendRatio : shareholderRatio;
  }

  readonly createTime: Timestamp;
  readonly companyName: string;
  readonly shareholderType: ShareholderTypeEnum;
  readonly ratio: number;
}
