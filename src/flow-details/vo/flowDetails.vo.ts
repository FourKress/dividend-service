import { FlowDetailsEntity } from '../entity/flowDetails.entity';

export class FlowDetailsVo {
  constructor(flowDetails: FlowDetailsEntity) {
    this.id = String(flowDetails.id);
    this.payer = flowDetails.payer;
    this.jobNo = flowDetails.jobNo;
    this.payDate = flowDetails.payDate;
    this.amount = flowDetails.amount;
    this.bankName = flowDetails.bankName;
  }
  readonly id: string;
  readonly payer: string;
  readonly jobNo: string;
  readonly payDate: string;
  readonly amount: number;
  readonly bankName: string;
}
