import { Region2CnEnum } from '../../common/enum';
import { IStaffGrantItem } from '../interface/staffGrantItem';
import { JsonObject } from '../../common/interfaces/json-object.interface';

export class StaffGrantVo {
  constructor(staffGrant: IStaffGrantItem) {
    const {
      virtualRealAmt,
      primitiveRealAmt,
      virtualSurplusAmt,
      primitiveSurplusAmt,
      primitiveShouldAmt,
      virtualShouldAmt,
      region,
    } = staffGrant;
    this.staffName = staffGrant.staffName;
    this.staffId = staffGrant.staffId;
    this.jobNo = staffGrant.jobNo;
    this.position = staffGrant.position;

    this.region = '';
    if (region !== '') {
      this.region = {
        label: Region2CnEnum[String(region)],
        value: Number(region),
      };
    }

    this.staffCompanyName = staffGrant.staffCompanyName;
    this.grantYears = staffGrant.grantYears;
    this.virtualShouldAmt = Number(virtualShouldAmt).toFixed(2);
    this.virtualRealAmt = Number(virtualRealAmt).toFixed(2);
    this.virtualSurplusAmt = Number(virtualSurplusAmt).toFixed(2);
    this.primitiveShouldAmt = Number(primitiveShouldAmt).toFixed(2);
    this.primitiveRealAmt = Number(primitiveRealAmt).toFixed(2);
    this.primitiveSurplusAmt = Number(primitiveSurplusAmt).toFixed(2);

    this.yearsRealGrantAmt = (
      Number(virtualRealAmt) + Number(primitiveRealAmt)
    ).toFixed(2);
    this.yearsRealSurplusAmt = (
      Number(virtualSurplusAmt) + Number(primitiveSurplusAmt)
    ).toFixed(2);
  }

  readonly staffName: string;
  readonly staffId: string;
  readonly jobNo: string;
  readonly position: string;
  readonly region: JsonObject | string;
  readonly staffCompanyName: string;
  readonly grantYears: string;
  readonly virtualShouldAmt: string;
  readonly virtualRealAmt: string;
  readonly virtualSurplusAmt: string;
  readonly primitiveShouldAmt: string;
  readonly primitiveRealAmt: string;
  readonly primitiveSurplusAmt: string;
  readonly yearsRealGrantAmt: string;
  readonly yearsRealSurplusAmt: string;
}
