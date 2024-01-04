import { Timestamp } from 'typeorm';
import { ICompanyItem } from '../interface/companyItem';
import { CompanyAttributeEntity } from '../../company-attribute/entity/company-attribute.entity';
import { CompanyStatusEnum, RegionEnum } from '../../common/enum';

export class CompanyVo {
  constructor(company: ICompanyItem) {
    this.id = String(company.id);
    this.name = company.name;
    this.status = company.status;

    this.attributeId = company.attributeId;
    this.attribute = company.attribute;
    this.region = company.region;
    this.subscriberAmount = company.subscriberAmount;
    this.businessLicenseTime = company.businessLicenseTime;
    this.registeredAddress = company.registeredAddress;
    this.writeOffTime = company.writeOffTime;
    this.accountName = company.accountName;
    this.accountNumber = company.accountNumber;
    this.accountBank = company.accountBank;
    this.taxNumber = company.taxNumber;
    this.telephone = company.telephone;
    this.businessLicenseLegalFileId = company.businessLicenseLegalFileId;
    this.updateTime = company.updateTime;
  }
  readonly id: string;
  readonly name: string;
  readonly status: CompanyStatusEnum;

  readonly attributeId: string;
  readonly attribute?: CompanyAttributeEntity;

  readonly region: RegionEnum;
  readonly subscriberAmount: number;
  readonly businessLicenseTime: string;
  readonly registeredAddress: string;
  readonly writeOffTime: string;
  readonly accountName: string;
  readonly accountNumber: string;
  readonly accountBank: string;
  readonly taxNumber: string;
  readonly telephone: string;
  readonly businessLicenseLegalFileId: string;
  readonly updateTime: Timestamp;
}
