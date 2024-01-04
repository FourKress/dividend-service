import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Express } from 'express';
import { FileEntity } from './entity/file.entity';
import AliOss from '../ali-oss';
import { ResponseTools } from '../common/utils/response-tools';
import { IFile } from './interface/file.interface';
import Excel from '../excel';
import { ImportStatusEnum, ShareholderTypeEnum } from '../common/enum';
import { StaffService } from '../staff/staff.service';
import { IPageInterface } from '../common/interfaces/page.interface';
import { ImportRecordsPageDto, ImportDetailsPageDto } from './dto';
import { PageService } from '../common/utils/pageService';
import { ImportRecordsEntity } from './entity/import-records.entity';
import { CompanyAttributeService } from '../company-attribute/company-attribute.service';
import { CompanyService } from '../company/company.service';
import { VirtualGrantService } from '../virtual-grant/virtual-grant.service';
import { PrimitiveGrantService } from '../primitive-grant/primitive-grant.service';
import { FlowDetailsService } from '../flow-details/flow-details.service';
import { MainCompanyService } from '../main-company/main-company.service';
import { ShareholderService } from '../shareholder/shareholder.service';

const { Duplex } = require('stream');
const Moment = require('moment');

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private fileRepository: Repository<FileEntity>,
    @InjectRepository(ImportRecordsEntity)
    private importRecordsRepository: Repository<ImportRecordsEntity>,

    private readonly staffService: StaffService,
    private readonly companyAttributeService: CompanyAttributeService,
    private readonly companyService: CompanyService,
    private readonly virtualGrantService: VirtualGrantService,
    private readonly flowDetailsService: FlowDetailsService,
    private readonly mainCompanyService: MainCompanyService,
    private readonly primitiveGrantService: PrimitiveGrantService,
    private readonly shareholderService: ShareholderService,
  ) {}

  async findById(id: string): Promise<FileEntity> {
    const file = await this.fileRepository.findOne({
      where: {
        id,
        isDelete: false,
      },
    });
    if (!file) {
      ResponseTools.fail('未找到目标文件');
    }
    return file;
  }

  async modifyById(file: FileEntity): Promise<boolean> {
    const { id, ...info } = file;
    const { affected } = await this.fileRepository.update(id, {
      ...info,
    });
    if (affected !== 1) {
      ResponseTools.fail('文件删除失败');
      return false;
    }
    return true;
  }

  async handleSaveFile(
    file: Express.Multer.File,
    templateCode?: string,
    params?: { importTime: string; importStatus: ImportStatusEnum },
  ): Promise<FileEntity> {
    const { filename, originalname } = file;

    const fileFromDB = await this.fileRepository.save({
      mimetype: originalname.replace(/[\s\S]+\./, '').toLowerCase(),
      name: filename,
      templateCode: templateCode || '',
      ...params,
    });

    await AliOss.ossPutFile(fileFromDB);

    return fileFromDB;
  }

  async uploadFile(
    file: Express.Multer.File,
    templateCode: string,
  ): Promise<IFile> {
    const fileFromDB = await this.handleSaveFile(file, templateCode);

    const previewUrl = await this.handlePreview(fileFromDB.name);

    return {
      ...fileFromDB,
      url: AliOss.getOSSObject(fileFromDB.name),
      previewUrl,
      downloadUrl: '',
    };
  }

  async deleteFile(fileId: string): Promise<boolean> {
    const file = await this.findById(fileId);

    await this.modifyById({
      ...file,
      isDelete: true,
    });

    return await AliOss.ossDeleteFile(file.name);
  }

  async deleteAllFile(prefix: string): Promise<boolean> {
    return await AliOss.ossDeleteAllFile(prefix);
  }

  async downloadFile(fileId: string): Promise<any> {
    const file = await this.findById(fileId);
    if (!file) {
      ResponseTools.fail('没有文件可下载');
      return;
    }
    const buffer = await AliOss.ossGetFile(file.name);
    if (!buffer) {
      ResponseTools.fail('文件下载失败');
    }
    return this.buffer2Stream(buffer);
  }

  async downloadTemplate(templateCode: string): Promise<any> {
    const file = await this.fileRepository.findOneBy({
      templateCode,
    });
    if (!file) {
      ResponseTools.fail('没有对应模板可下载');
      return;
    }
    const buffer = await AliOss.ossGetFile(file.name);
    if (!buffer) {
      ResponseTools.fail('模板下载失败');
    }

    return this.buffer2Stream(buffer);
  }

  async buffer2Stream(buffer): Promise<any> {
    const stream = new Duplex();
    stream.push(buffer);
    stream.push(null);
    return stream;
  }

  async handlePreview(filename): Promise<string> {
    return await AliOss.ossPerViewFile(filename);
  }

  async previewFile(fileId: string): Promise<string> {
    const file = await this.findById(fileId);
    return await this.handlePreview(file.name);
  }

  async getFileInfo(fileId: string): Promise<IFile> {
    const file = await this.findById(fileId);
    const previewUrl = await this.handlePreview(file.name);

    return {
      ...file,
      url: AliOss.getOSSObject(file.name),
      previewUrl,
      downloadUrl: '',
    };
  }

  async getFiles(ids: string[]): Promise<IFile[]> {
    const files = [];
    await Promise.all(
      ids.map(async (id) => {
        const file = await this.findById(id);
        const previewUrl = await this.handlePreview(file.name);

        files.push({
          ...file,
          url: AliOss.getOSSObject(file.name),
          previewUrl,
          downloadUrl: '',
        });
      }),
    );
    return files;
  }

  async getSubFiles(id: string): Promise<any> {
    const file = await this.findById(id);
    const subFile = await AliOss.ossZipFileList(file.name);

    subFile.map((d) => {
      return {
        ...d,
        url: AliOss.getOSSObject(file.name),
        previewUrl: d.previewUrl,
        downloadUrl: '',
      };
    });

    return subFile;
  }

  async importFile(
    file: Express.Multer.File,
    templateCode: string,
  ): Promise<any> {
    const fileByDB = await this.fileRepository.findOneBy({ templateCode });
    if (!fileByDB) {
      ResponseTools.fail('未找到对应的模板,请检查后重试');
    }

    const importTime = Moment().format('YYYY-MM-DD HH:mm:ss');
    const excelData = await Excel.analyzeExcelData(file.filename, templateCode);
    const { failedList, relationList } = excelData;
    let { successList } = excelData;

    if (successList.length && relationList.length) {
      const checkList = await this.importRelationHandleMap(
        successList,
        relationList,
      );
      successList = successList
        .map((d, i) => {
          const target = checkList[i];
          if (target?.errMsg) {
            d.errMsg = target.errMsg;
            failedList.push(target);
          } else if (target?.relationMap) {
            const { relationMap } = target;
            Object.keys(relationMap).forEach((r) => {
              d[`${r}_relationId`] = relationMap[r];
            });
          }
          return d;
        })
        .filter((d) => !d?.errMsg);
    }

    const successLength = successList.length;
    const failedLength = failedList.length;

    const importFile = await this.handleSaveFile(file, templateCode, {
      importTime,
      importStatus: failedList.length ? 0 : 1,
    });

    const importRecords = [];
    [...successList, ...failedList].forEach((d) => {
      importRecords.push({
        rawData: JSON.stringify(d),
        msg: d.errMsg,
        importStatus: d.errMsg ? 0 : 1,
        importTime,
        templateCode,
        fileId: importFile.id,
      });
    });

    console.log(failedList);

    // && !failedLength
    if (successLength) {
      await this.importSuccessHandleMap(successList, templateCode);
    }

    await this.importRecordsRepository
      .createQueryBuilder('import-records')
      .insert()
      .values(importRecords)
      .execute();

    return {
      fileId: String(importFile.id),
      succeedCount: successLength,
      failedCount: failedLength,
    };
  }

  async importSuccessHandleMap(excelData, templateCode): Promise<boolean> {
    const insertList = [];
    excelData.forEach((d) => {
      const item = {};
      Object.keys(d).forEach((k) => {
        if (d[k]?.rawValue) {
          item[k] = d[k].value;
        } else {
          item[k] = d[k];
        }
      });
      insertList.push(item);
    });
    const map = {
      staff: async (value) => await this.handlerStaffImport(value),
      company: async (value) => await this.handlerCompanyImport(value),
      virtualGrant: async (value) =>
        await this.handlerVirtualGrantImport(value),
      primitiveGrant: async (value) =>
        await this.handlerPrimitiveGrantImport(value),
      flowDetails: async (value) => await this.handlerFlowDetailsImport(value),
      mainCompany: async (value) => await this.handlerMainCompanyImport(value),
      proxyShareholder: async (value) =>
        await this.handlerProxyShareholderImport(value),
      mainCompanyShareholder: async (value) =>
        await this.handlerMainCompanyShareholderImport(value),
    };

    return map[templateCode](insertList);
  }

  async importRelationHandleMap(excelData, relationList): Promise<any[]> {
    const map = {
      staff: async (excelData, relation) =>
        await this.handlerStaffRelation(excelData, relation),
      attribute: async (excelData, relation) =>
        await this.handlerCompanyAttributeRelation(excelData, relation),
      company: async (excelData, relation) =>
        await this.handlerCompanyRelation(excelData, relation),
      staff_flowDetails: async (excelData, relation) =>
        await this.handlerFlowDetailsRelation(excelData, relation),
      mainCompany: async (excelData, relation) =>
        await this.handlerMainCompanyRelation(excelData, relation),
    };
    const relationKeys = relationList.map((d) => d.relation);
    let result = [];
    await Promise.all(
      relationKeys.map(async (k) => {
        const relation = relationList.find((f) => f.relation === k);
        const valuesByDB = await map[k](excelData, relation.key);
        result = excelData.map((d, index) => {
          const value = d[relation.key];
          const target = valuesByDB?.find((v) => value === v?.value);

          if (result[index]?.errMsg) {
            return result[index];
          }
          let errMsg = '';
          if (relation?.isRepeat) {
            errMsg = !target ? '' : relation.errMsg;
          } else {
            errMsg = target ? '' : relation.errMsg;
          }

          const relationMap = result[index]?.relationMap ?? {};

          return {
            ...d,
            relationMap: {
              ...relationMap,
              [relation.key]: target?.relationId,
            },
            errMsg,
          };
        });
      }),
    );
    return result;
  }

  async handlerStaffRelation(excelData, key): Promise<any[]> {
    const values = [
      ...excelData.map((d) => {
        return {
          [key]: d[key],
          jobNo: d.jobNo,
        };
      }),
    ];
    const result = await this.staffService.findByNameAndJobNoAll(values);
    const valuesByDB = [
      ...new Set(
        result.map((d) => {
          return {
            value: d.name,
            relationId: d.id,
          };
        }),
      ),
    ];

    return valuesByDB;
  }

  async handlerFlowDetailsRelation(excelData, key): Promise<any[]> {
    const values = [
      ...excelData.map((d) => {
        return {
          name: d[key],
          jobNo: d.jobNo,
        };
      }),
    ];
    const result = await this.staffService.findByNameAndJobNoAll(values);
    const valuesByDB = [
      ...new Set(
        result.map((d) => {
          return {
            value: d.name,
            relationId: d.id,
          };
        }),
      ),
    ];

    return valuesByDB;
  }

  async handlerCompanyAttributeRelation(excelData, key): Promise<any[]> {
    const values = [
      ...new Set(
        excelData.map((d) => {
          return d[key];
        }),
      ),
    ];
    const result = await this.companyAttributeService.findByAttributeAll(
      values,
    );
    const valuesByDB = [
      ...new Set(
        result.map((d) => {
          return {
            value: d.attribute,
            relationId: d.id,
          };
        }),
      ),
    ];

    return valuesByDB;
  }

  async handlerCompanyRelation(excelData, key): Promise<any[]> {
    const values = [
      ...new Set(
        excelData.map((d) => {
          return d[key];
        }),
      ),
    ];
    const result = await this.companyService.findByNameAll(values);
    const valuesByDB = [
      ...new Set(
        result?.map((d) => {
          return {
            value: d?.name,
            relationId: d?.id,
          };
        }),
      ),
    ];

    return valuesByDB;
  }

  async handlerMainCompanyRelation(excelData, key): Promise<any[]> {
    const values = [
      ...new Set(
        excelData.map((d) => {
          return d[key];
        }),
      ),
    ];
    const result = await this.mainCompanyService.findByNameAll(values);
    const valuesByDB = [
      ...new Set(
        result?.map((d) => {
          return {
            value: d?.name,
            relationId: d?.id,
          };
        }),
      ),
    ];

    return valuesByDB;
  }

  async handlerStaffImport(excelData): Promise<any> {
    return await this.staffService.createBatch(excelData);
  }

  async handlerCompanyImport(excelData): Promise<any> {
    const insertValue = excelData.map((d) => {
      return {
        ...d,
        attributeId: d['attribute_relationId'],
      };
    });
    return await this.companyService.createBatch(insertValue);
  }

  async handlerMainCompanyImport(excelData): Promise<any> {
    const insertValue = excelData.map((d) => {
      return {
        ...d,
      };
    });
    return await this.mainCompanyService.createBatch(insertValue);
  }

  async handlerVirtualGrantImport(excelData): Promise<any> {
    const insertValue = excelData.map((d) => {
      return {
        ...d,
        grantStatus: 0,
        importTime: Moment().format('YYYY-MM-DD HH:mm:ss'),
      };
    });
    return await this.virtualGrantService.batchUpData(insertValue);
  }

  async handlerPrimitiveGrantImport(excelData): Promise<any> {
    const insertValue = excelData.map((d) => {
      const { mainCompanyName, ...info } = d;
      return {
        ...info,
        mainCompanyName: d.mainCompany,
        grantStatus: 0,
        importTime: Moment().format('YYYY-MM-DD HH:mm:ss'),
      };
    });
    return await this.primitiveGrantService.createBatch(insertValue);
  }

  async handlerFlowDetailsImport(excelData): Promise<any> {
    const insertValue = excelData.map((d) => {
      return {
        ...d,
      };
    });
    return await this.flowDetailsService.createBatch(insertValue);
  }

  async handlerProxyShareholderImport(excelData): Promise<any> {
    const insertValue = excelData.map((d) => {
      return {
        ...d,
        companyId: d['company_relationId'],
        staffId: d['name_relationId'],
        isDelete: false,
      };
    });

    return await this.shareholderService.proxyCreate(insertValue);
  }

  async handlerMainCompanyShareholderImport(excelData): Promise<any> {
    const insertValue = {
      virtualShareholder: [],
      primitiveShareholder: [],
    };
    excelData.forEach((d) => {
      const { shareholderRatio, shareholderType, ...info } = d;
      const isVirtual =
        shareholderType === ShareholderTypeEnum.VIRTUAL_SHAREHOLDER;
      const data = {
        ...info,
        companyId: d['mainCompany_relationId'],
        staffId: d['name_relationId'],
        shareholderType,
        [isVirtual ? 'shareholderRatio' : 'dividendRatio']: shareholderRatio,
        isDelete: false,
      };
      insertValue[
        isVirtual ? 'virtualShareholder' : 'primitiveShareholder'
      ].push(data);
    });

    return await this.shareholderService.create(insertValue);
  }

  async getImportRecords(
    pageSearch: ImportRecordsPageDto,
  ): Promise<IPageInterface<FileEntity>> {
    const { fileName, importTimeEnd, importTimeStart, ...data } = pageSearch;
    const params = fileName
      ? {
          ...data,
          name: Like(`%${fileName}%`),
        }
      : data;

    const startTime = `${importTimeStart} 00:00:00`;
    const endTime = `${importTimeEnd} 23:59:59`;

    const repository = this.fileRepository;
    const queryBuilder = repository.createQueryBuilder('file');
    if (importTimeStart && importTimeEnd) {
      queryBuilder.where('importTime BETWEEN :start AND :end', {
        start: startTime,
        end: endTime,
      });
    } else if (importTimeStart && !importTimeEnd) {
      queryBuilder.where('importTime >= :start', {
        start: startTime,
      });
    } else if (!importTimeStart && importTimeEnd) {
      queryBuilder.where('importTime <= :end', {
        end: endTime,
      });
    }

    queryBuilder.orderBy('importTime', 'DESC');

    const { importStatus } = data;
    const importStatusList = [
      String(ImportStatusEnum.FALSE),
      String(ImportStatusEnum.TRUE),
    ];

    queryBuilder.andWhere('file.importStatus IN (:...importStatus)', {
      importStatus:
        importStatus !== undefined ? [String(importStatus)] : importStatusList,
    });

    return await new PageService(repository, params).fetch({
      queryBuilder,
      alias: 'file',
    });
  }

  async getImportDetails(
    pageSearch: ImportDetailsPageDto,
  ): Promise<IPageInterface<ImportRecordsEntity>> {
    return await new PageService(
      this.importRecordsRepository,
      pageSearch,
    ).fetch({
      alias: 'importRecords',
    });
  }
}
