import {
  BooleanFlag2CnEnum,
  CompanyStatus2CnEnum,
  EmployeeAttribute2CnEnum,
  Region2CnEnum,
  ShareholderType2CnEnum,
} from '../enum';

export const MAX_VIRTUAL_SHAREHOLDER_RATIO = 27;

export interface ITemplateItem {
  title: string;
  key: string;
  check?: (value) => boolean;
  transformer?: (value) => any;
  errMsg?: string;
  relation?: string;
  dateFormat?: (value) => string;
  isRepeat?: boolean;
}

export interface JsonObject {
  [k: string]: ITemplateItem[];
}

const Moment = require('moment');
const changeDate = (timeNum, mat = 'YYYY-MM-DD') => {
  if (!timeNum) return '';
  const d = timeNum - 1;
  const t = Math.round((d - Math.floor(d)) * 24 * 60 * 60);
  return Moment(new Date(1900, 0, d, 0, 0, t)).format(mat);
};

export const TEMPLATE_CODE: JsonObject = {
  staff: [
    {
      title: '姓名',
      key: 'name',
      relation: 'staff',
      isRepeat: true,
      errMsg: '姓名+工号已存在相同数据',
    },
    {
      title: '工号',
      key: 'jobNo',
    },
    {
      title: '职位',
      key: 'position',
    },
    {
      title: '职级',
      key: 'rank',
    },
    {
      title: '属性',
      key: 'employeeAttribute',
      check: (d) => {
        return EmployeeAttribute2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return EmployeeAttribute2CnEnum[d];
      },
      errMsg: '属性值不满足枚举要求',
    },
    {
      title: '所在大区',
      key: 'region',
      check: (d) => {
        return Region2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return Region2CnEnum[d];
      },
      errMsg: '所在大区值不满足枚举要求',
    },
    {
      title: '所在公司',
      key: 'companyName',
    },
    {
      title: '身份证号码',
      key: 'idCardNo',
    },
    {
      title: '年龄',
      key: 'age',
    },
    {
      title: '联系电话',
      key: 'phoneNum',
    },
    {
      title: '收件地址',
      key: 'address',
    },
    {
      title: '收款银行',
      key: 'bankName',
    },
    {
      title: '收款账户',
      key: 'accountName',
    },
    {
      title: '收款账号',
      key: 'account',
    },
  ],
  company: [
    {
      title: '公司名称',
      key: 'name',
      relation: 'company',
      isRepeat: true,
      errMsg: '公司名称重复',
    },
    {
      title: '公司状态',
      key: 'status',
      check: (d) => {
        return CompanyStatus2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return CompanyStatus2CnEnum[d];
      },
      errMsg: '公司状态值不满足枚举要求',
    },
    {
      title: '公司属性',
      key: 'attribute',
      relation: 'attribute',
      errMsg: '公司属性值匹配失败',
    },
    {
      title: '所属大区',
      key: 'region',
      check: (d) => {
        return Region2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return Region2CnEnum[d];
      },
      errMsg: '所属大区值不满足枚举要求',
    },

    {
      title: '认缴资本',
      key: 'subscriberAmount',
    },

    {
      title: '营业执照时间',
      key: 'businessLicenseTime',
      dateFormat: (d) => {
        return changeDate(d);
      },
    },
    {
      title: '注册地址',
      key: 'registeredAddress',
    },
    {
      title: '账户名称',
      key: 'accountName',
    },
    {
      title: '账户号码',
      key: 'accountNumber',
    },
    {
      title: '开户行',
      key: 'accountBank',
    },
    {
      title: '税号',
      key: 'taxNumber',
    },
    {
      title: '电话',
      key: 'telephone',
    },
  ],

  mainCompany: [
    {
      title: '经营主体名称',
      key: 'name',
      relation: 'mainCompany',
      isRepeat: true,
      errMsg: '经营主体重复',
    },
    {
      title: '主体公司',
      key: 'companyBody',
    },
    {
      title: '经营主体状态',
      key: 'status',
      check: (d) => {
        return CompanyStatus2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return CompanyStatus2CnEnum[d];
      },
      errMsg: '经营主体状态值不满足枚举要求',
    },
    {
      title: '所属大区',
      key: 'region',
      check: (d) => {
        return Region2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return Region2CnEnum[d];
      },
      errMsg: '所属大区值不满足枚举要求',
    },

    {
      title: '是否新开园',
      key: 'isNew',
      check: (d) => {
        return BooleanFlag2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return BooleanFlag2CnEnum[d];
      },
      errMsg: '是否新开园值不满足枚举要求',
    },
    {
      title: '是否做股转',
      key: 'isSharesTransfer',
      check: (d) => {
        return BooleanFlag2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return BooleanFlag2CnEnum[d];
      },
      errMsg: '是否做股转值不满足枚举要求',
    },

    {
      title: '保证金',
      key: 'securityDepositAmount',
    },
  ],

  virtualGrant: [
    {
      title: '发放ID',
      key: 'id',
    },
    {
      title: '经营主体ID',
      key: 'mainCompanyId',
    },
    {
      title: '经营主体',
      key: 'mainCompanyName',
    },
    {
      title: '主体公司',
      key: 'companyBody',
    },
    {
      title: '所属大区',
      key: 'region',
      check: (d) => {
        return Region2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return Region2CnEnum[d];
      },
      errMsg: '所属大区值不满足枚举要求',
    },
    {
      title: '是否为新开园',
      key: 'isNew',
      check: (d) => {
        return BooleanFlag2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return BooleanFlag2CnEnum[d];
      },
      errMsg: '是否为新开园值不满足枚举要求',
    },
    {
      title: '是否做股转',
      key: 'isSharesTransfer',
      check: (d) => {
        return BooleanFlag2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return BooleanFlag2CnEnum[d];
      },
      errMsg: '是否做股转值不满足枚举要求',
    },
    {
      title: '分配年份',
      key: 'grantYears',
    },
    {
      title: '授予时间',
      key: 'authorizeTime',
      dateFormat: (d) => {
        return changeDate(d, 'YYYY-MM');
      },
    },
    {
      title: '年初剩余分配金额',
      key: 'yearUnpaidGrantAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '年初剩余分配金额不是数字',
    },
    {
      title: '当年金额',
      key: 'yearAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '当年金额不是数字',
    },
    {
      title: '不打折基数',
      key: 'noDiscountBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '不打折基数不是数字',
    },
    {
      title: '打折基数',
      key: 'discountBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '打折基数不是数字',
    },
    {
      title: '应分配基数',
      key: 'awaitGrantBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '应分配基数不是数字',
    },
    {
      title: '实分配基数',
      key: 'realGrantBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '实际分配基数不是数字',
    },
    {
      title: '剩余分配基数',
      key: 'unpaidGrantBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '剩余分配基数不是数字',
    },
    {
      title: '应分配金额',
      key: 'awaitGrantAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '应分配金额不是数字',
    },
    {
      title: '实分配金额',
      key: 'realGrantAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '实分配金额不是数字',
    },
    {
      title: '未分配金额',
      key: 'unpaidGrantAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '未分配金额不是数字',
    },
    {
      title: '分配状态',
      key: 'grantStatus',
    },
    {
      title: '备注',
      key: 'remark',
    },
    {
      title: '分配时间',
      key: 'grantTime',
    },
    {
      title: '导入时间',
      key: 'importTime',
    },
  ],
  primitiveGrant: [
    {
      title: '经营主体',
      key: 'mainCompany',
      relation: 'mainCompany',
      errMsg: '经营主体值匹配失败',
    },

    {
      title: '期初未分配金额',
      key: 'yearUnpaidGrantAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '年初剩余分配金额不是数字',
    },
    {
      title: '当年金额',
      key: 'yearAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '当年金额不是数字',
    },
    {
      title: '已分配金额',
      key: 'allocatedAmount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '已分配金额不是数字',
    },

    {
      title: '应分配基数',
      key: 'awaitGrantBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '应分配基数不是数字',
    },
    {
      title: '实分配基数',
      key: 'realGrantBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '实际分配基数不是数字',
    },
    {
      title: '剩余分配基数',
      key: 'unpaidGrantBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '剩余分配基数不是数字',
    },

    {
      title: '备注',
      key: 'remark',
    },
  ],

  flowDetails: [
    {
      title: '付款人',
      key: 'payer',
      relation: 'staff_flowDetails',
      errMsg: '姓名+工号无法匹配',
    },
    {
      title: '工号',
      key: 'jobNo',
    },
    {
      title: '付款日期',
      key: 'payDate',
      dateFormat: (d) => {
        return changeDate(d);
      },
    },
    {
      title: '付款金额',
      key: 'amount',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '付款金额不是数字',
    },
    {
      title: '收款账户',
      key: 'bankName',
    },
  ],

  proxyShareholder: [
    {
      title: '公司名称',
      key: 'company',
      relation: 'company',
      errMsg: '公司名称值匹配失败',
    },
    {
      title: '股东姓名',
      key: 'name',
      relation: 'staff',
      errMsg: '股东姓名+工号无法匹配',
    },
    {
      title: '工号',
      key: 'jobNo',
    },
    {
      title: '股东类型',
      key: 'shareholderType',
      check: (d) => {
        return ShareholderType2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return ShareholderType2CnEnum[d];
      },
      errMsg: '股东类型值不满足枚举要求',
    },
    {
      title: '股份比例',
      key: 'shareholderRatio',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '股东比例不是数字',
    },
    {
      title: '提供人',
      key: 'provideName',
    },
    {
      title: '代理开始时间',
      key: 'proxyStartTime',
      dateFormat: (d) => {
        return changeDate(d);
      },
    },
  ],

  mainCompanyShareholder: [
    {
      title: '经营主体',
      key: 'mainCompany',
      relation: 'mainCompany',
      errMsg: '经营主体值匹配失败',
    },
    {
      title: '股东姓名',
      key: 'name',
      relation: 'staff',
      errMsg: '股东姓名+工号无法匹配',
    },
    {
      title: '工号',
      key: 'jobNo',
    },
    {
      title: '股东类型',
      key: 'shareholderType',
      check: (d) => {
        return ShareholderType2CnEnum[d] !== undefined;
      },
      transformer: (d) => {
        return ShareholderType2CnEnum[d];
      },
      errMsg: '股东类型值不满足枚举要求',
    },
    {
      title: '持股/分红比例',
      key: 'shareholderRatio',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '股东比例不是数字',
    },

    {
      title: '授权时间',
      key: 'authorizeTime',
      dateFormat: (d) => {
        return changeDate(d, 'YYYY-MM');
      },
    },

    {
      title: '打折基数',
      key: 'discountBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '打折基数不是数字',
    },
    {
      title: '不打折基数',
      key: 'noDiscountBase',
      check: (d) => {
        return !isNaN(Number(d));
      },
      transformer: () => {
        return undefined;
      },
      errMsg: '不打折基数不是数字',
    },
  ],
};
