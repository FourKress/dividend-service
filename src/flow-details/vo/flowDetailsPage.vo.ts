import { FlowDetailsEntity } from '../entity/flowDetails.entity';
import { FlowDetailsVo } from './flowDetails.vo';
import { PageVo } from '../../common/vo/page.vo';

export class FlowDetailsPageVo extends PageVo<FlowDetailsVo> {
  constructor(flowDetailsPage: PageVo<FlowDetailsEntity>) {
    super(flowDetailsPage);
    const { records } = flowDetailsPage;
    this.records = records.map((d) => {
      return new FlowDetailsVo(d);
    });
  }

  readonly records: FlowDetailsVo[];
}
