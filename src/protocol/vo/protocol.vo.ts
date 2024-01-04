import { ProtocolEntity } from '../entity/protocol.entity';

export class ProtocolVo {
  constructor(protocol: ProtocolEntity) {
    this.id = String(protocol.id);
    this.companyId = String(protocol.companyId);
    this.signTime = protocol.signTime;
    this.endTime = protocol.endTime;
    this.partyA = protocol.partyA;
    this.partyB = protocol.partyB;
    this.type = protocol.type;
    this.fileId = protocol.fileId;
  }
  readonly id: string;
  readonly companyId: string;
  readonly signTime: string;
  readonly endTime: string;
  readonly partyA: string;
  readonly partyB: string;
  readonly type: string;
  readonly fileId: string;
}
