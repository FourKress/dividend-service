export interface IShareholderGrantItem {
  mainCompanyId: string;
  mainCompanyName: string;
  region: string;

  staffId: string;
  staffName: string;
  jobNo: string;

  shareholderId: string;
  dividendRatio: number;

  grantId: string;
  awaitGrantBase: number;
  realGrantBase: number;
}
