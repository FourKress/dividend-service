import { CompanyEntity } from '../../company/entity/company.entity';
import { CompanyAttributeEntity } from '../../company-attribute/entity/company-attribute.entity';
import { ProxyGrantEntity } from '../../proxy-grant/entity/proxy-grant.entity';

export interface ICompanyItem extends CompanyEntity {
  attribute?: CompanyAttributeEntity;
  proxyGrant?: ProxyGrantEntity;
}
