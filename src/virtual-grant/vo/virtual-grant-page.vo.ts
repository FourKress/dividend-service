import { PageVo } from '../../common/vo/page.vo';
import { VirtualGrantVo } from './virtual-grant.vo';
import { VirtualGrantEntity } from '../entity/virtual-grant.entity';

export class VirtualGrantPageVo extends PageVo<VirtualGrantVo> {
  constructor(virtualGrant: PageVo<VirtualGrantEntity>) {
    super(virtualGrant);
    const { records } = virtualGrant;
    this.records = records.map((d) => {
      return new VirtualGrantVo(d);
    });
  }

  readonly records: VirtualGrantVo[];
}
