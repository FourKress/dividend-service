import { StaffVo } from './staff.vo';
import { IStaffPageItem } from '../interface/staff.interface';
import { ShareholderTypeEnum } from '../../common/enum';

export class StaffPageItemVo extends StaffVo {
  constructor(staff: IStaffPageItem) {
    super(staff);
    this.companyQuantity =
      (staff?.company?.length ?? 0) + (staff?.mainCompany?.length ?? 0);
    let virtualShareholderInfo;
    const shareholderTypes = staff?.shareholder.map((d) => {
      if (
        d.shareholderType['value'] === ShareholderTypeEnum.VIRTUAL_SHAREHOLDER
      ) {
        virtualShareholderInfo = {
          shareholderRatio: d.shareholderRatio,
          securityDepositAmount:
            staff.mainCompany.find((c) => c.id.toString() === d.companyId)
              ?.securityDepositAmount || 0,
        };
      }
      return d.shareholderType['label'] as string;
    });

    this.shareholderType = [...new Set(shareholderTypes)].join(',');

    const shouldAmount = virtualShareholderInfo
      ? virtualShareholderInfo.securityDepositAmount *
        (virtualShareholderInfo.shareholderRatio / 100)
      : 0;
    const realAmount = staff.flowDetailsList.reduce(
      (sum, current) => sum + Number(current.amount),
      0,
    );
    this.shouldAmount = shouldAmount.toFixed(2);
    this.realAmount = realAmount.toFixed(2);
    this.awaitAmount = (shouldAmount - realAmount).toFixed(2);
  }
  readonly companyQuantity?: number;
  readonly shareholderType?: string;
  readonly shouldAmount?: string;
  readonly realAmount?: string;
  readonly awaitAmount?: string;
}
