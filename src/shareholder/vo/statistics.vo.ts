import { ShareholderTypeEnum } from '../../common/enum';
import { ShareholderEntity } from '../entity/shareholder.entity';
import { MAX_VIRTUAL_SHAREHOLDER_RATIO } from '../../common/constant';

export class StatisticsVo {
  constructor(statisticsList: ShareholderEntity[]) {
    let ratioTotal = 0;
    let dividendRatioTotal = 0;

    statisticsList.forEach((d) => {
      const { shareholderType } = d;
      const value = shareholderType['value'] as number;
      d.shareholderType = value;
      switch (value) {
        case ShareholderTypeEnum.VIRTUAL_SHAREHOLDER:
          ratioTotal += Number(d.shareholderRatio);
          break;
        case ShareholderTypeEnum.PRIMITIVE_SHAREHOLDER:
          dividendRatioTotal += Number(d.dividendRatio);
          break;
      }
    });
    this.shareholderRatioOverTotal = (
      MAX_VIRTUAL_SHAREHOLDER_RATIO - ratioTotal
    ).toFixed(2);
    this.shareholderRatioTotal = ratioTotal.toFixed(2);
    this.dividendRatioTotal = dividendRatioTotal.toFixed(2);
  }
  // 模拟股股份合计
  readonly shareholderRatioTotal: string;
  // 模拟股留存股份合计
  readonly shareholderRatioOverTotal: string;
  // 原始股股份合计
  readonly dividendRatioTotal: string;
}
