import { ShareholderEntity } from '../entity/shareholder.entity';
import { ShareholderTypeEnum } from '../../common/enum';
import { Timestamp } from 'typeorm';
import { CompanyEntity } from '../../company/entity/company.entity';

export interface IShareholderRecordsItem extends ShareholderEntity {
  company?: CompanyEntity;
  companyName: string;
  ratio: number;
  shareholderType: ShareholderTypeEnum;
  createTime: Timestamp;
}
