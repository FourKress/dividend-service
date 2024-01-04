import { ShareholderEntity } from '../entity/shareholder.entity';

export interface IShareholderPageItem extends ShareholderEntity {
  id: string;
  companyId: string;
  staffId: string;
  securityDepositAmount: number;
  staffName: string;
  jobNo: string;
  position: string;
  rank: string;
  bankName: string;
  account: string;
  accountName: string;
  shareholderType: number;
  dividendRatio: number;
  shareholderRatio: number;
}
