import { PageVo } from '../../common/vo/page.vo';
import { ProxyGrantEntity } from '../entity/proxy-grant.entity';
import { ProxyGrantVo } from './proxy-grant.vo';

export class ProxyGrantPageVo extends PageVo<ProxyGrantVo> {
  constructor(proxyGrant: PageVo<ProxyGrantEntity>) {
    super(proxyGrant);
    const { records } = proxyGrant;
    this.records = records.map((d) => {
      return new ProxyGrantVo(d);
    });
  }

  readonly records: ProxyGrantVo[];
}
