import { ProtocolEntity } from '../entity/protocol.entity';
import { ProtocolVo } from './protocol.vo';

export class ProtocolListVo {
  constructor(protocolList: ProtocolEntity[]) {
    this.records = protocolList.map((d) => {
      return new ProtocolVo(d);
    });
  }
  readonly records: ProtocolVo[];
}
