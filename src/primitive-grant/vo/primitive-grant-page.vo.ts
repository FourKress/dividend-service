import { PageVo } from '../../common/vo/page.vo';
import { PrimitiveGrantVo } from './primitive-grant.vo';
import { PrimitiveGrantEntity } from '../entity/primitive-grant.entity';

export class PrimitiveGrantPageVo extends PageVo<PrimitiveGrantVo> {
  constructor(primitiveGrant: PageVo<PrimitiveGrantEntity>) {
    super(primitiveGrant);
    const { records } = primitiveGrant;
    this.records = records.map((d) => {
      return new PrimitiveGrantVo(d);
    });
  }

  readonly records: PrimitiveGrantVo[];
}
