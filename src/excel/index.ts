import xlsx from 'node-xlsx';
import { readFileSync } from 'fs';
import { getUploadPath } from '../common/utils';
import { ResponseTools } from '../common/utils/response-tools';
import { ITemplateItem, TEMPLATE_CODE } from '../common/constant';
import { isEqual, isUndefined } from 'lodash';
import { JsonObject } from '../common/interfaces/json-object.interface';

interface IAnalyzeExcel {
  failedList: JsonObject[];
  successList: JsonObject[];
  relationList: ITemplateItem[];
}

class Excel {
  async analyzeExcelData(filename, templateCode): Promise<IAnalyzeExcel> {
    const workSheetsFromBuffer = xlsx.parse(
      readFileSync(`${getUploadPath(filename)}`),
    );
    const xlsxData = workSheetsFromBuffer[0]?.data;
    const [xlsxHeader, ...contentData]: any[] = xlsxData.filter(
      (d: string[]) => d?.length,
    );
    const templateConfig = TEMPLATE_CODE[templateCode];
    const templateHeader = templateConfig.map((d) => d.title);
    const relationList = [...new Set(templateConfig.filter((d) => d.relation))];
    if (!isEqual(xlsxHeader, templateHeader)) {
      ResponseTools.fail('请使用正确的模板');
    }
    const failedList = [];
    const successList = [];
    contentData.forEach((row) => {
      // if (row.length < xlsxHeader.length) {
      //   failedList.push(this.handleRow2Entity(row, templateConfig, true));
      //   return;
      // }
      row = row.slice(0, xlsxHeader.length);
      let isError = false;
      row.forEach((d, i) => {
        const target = templateConfig[i];
        if (!isError && target?.check) {
          isError = !target?.check(d);
        }
        return d;
      });
      if (isError) {
        failedList.push(this.handleRow2Entity(row, templateConfig, true));
      } else {
        successList.push(this.handleRow2Entity(row, templateConfig, false));
      }
    });
    return {
      failedList,
      successList,
      relationList,
    };
  }

  handleRow2Entity(row, templateConfig: ITemplateItem[], isError): JsonObject {
    const entity = {};
    templateConfig.forEach((d, index) => {
      const { key } = d;
      const rawValue = row[index];
      if (isError && d?.transformer) {
        const value = d.transformer(rawValue);
        entity[key] = {
          rawValue,
          value,
        };
        if (isUndefined(value) && !entity['errMsg']) {
          entity['errMsg'] = d.errMsg;
        }
      } else {
        if (d?.transformer) {
          const value = d.transformer(rawValue);
          if (!isUndefined(value)) {
            entity[key] = {
              rawValue,
              value: d.transformer(rawValue),
            };
          } else {
            entity[key] = rawValue;
          }
        } else if (d?.dateFormat) {
          entity[key] = d?.dateFormat(rawValue);
        } else {
          entity[key] = rawValue;
        }
      }
    });
    return entity;
  }

  async build(newSheets): Promise<Buffer> {
    const buffer = xlsx.build(newSheets);
    return buffer;
  }
}

export default new Excel();
