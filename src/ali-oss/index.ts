import { Logger } from '@nestjs/common';
import { unlinkSync } from 'fs';
const OSS = require('ali-oss');
import { FileEntity } from '../file/entity/file.entity';
import { getUploadPath } from '../common/utils';
import { ResponseTools } from '../common/utils/response-tools';

class AliOss {
  private readonly logger = new Logger('AliOSS');
  private readonly AliOSSClient = new OSS({
    accessKeyId: 'LTAI5tPAgckM1UP5L58QRpto',
    accessKeySecret: 'FG1vQO2eWzleOirGoqJ3ugPOH2t1ge',
    bucket: 'resico-dividend',
    region: 'oss-cn-zhangjiakou',
    cname: true,
    endpoint: 'dividend.prod.ustax.com.cn',
  });

  getEnv() {
    return process.env.RUN_TIME || 'dev';
  }

  getOSSObject(fileName) {
    return `/files/${this.getEnv()}/${fileName}`;
  }

  getOSSZipsObject(prefix) {
    return `zips/${this.getEnv()}/${prefix}`;
  }

  handleOSSDone(filename) {
    unlinkSync(getUploadPath(filename));
  }

  async ossPutFile(file: FileEntity): Promise<boolean> {
    try {
      const { name } = file;
      const ossObject = this.getOSSObject(name);
      await this.AliOSSClient.put(ossObject, `${getUploadPath(name)}`);
      this.handleOSSDone(name);
      return true;
    } catch (e) {
      this.logger.error(e, 'ossPutFile');
      ResponseTools.fail('文件上传失败');
      return false;
    }
  }

  async ossGetFile(filename): Promise<any> {
    try {
      const result = await this.AliOSSClient.get(this.getOSSObject(filename));
      return result.content;
    } catch (e) {
      this.logger.error(e, 'ossGetFile');
      return false;
    }
  }

  async ossDeleteFile(filename): Promise<boolean> {
    try {
      await this.AliOSSClient.delete(this.getOSSObject(filename));
      return true;
    } catch (e) {
      this.logger.error(e, 'ossDeleteFile');
      ResponseTools.fail('文件删除失败');
      return false;
    }
  }

  async ossDeleteAllFile(prefix: string): Promise<boolean> {
    try {
      const list = await this.AliOSSClient.list({
        prefix,
      });

      list.objects = list.objects || [];
      await Promise.all(list.objects.map((v) => this.handleDel(v.name)));
      return true;
    } catch (e) {
      this.logger.error(e, 'ossDeleteAllFile');
      ResponseTools.fail('文件删除失败');
      return false;
    }
  }

  // 处理请求失败的情况，防止promise.all中断，并返回失败原因和失败文件名。
  async handleDel(name) {
    try {
      await this.AliOSSClient.delete(name, {
        quiet: true,
      });
    } catch (error) {
      error.failObjectName = name;
      return error;
    }
  }

  async ossPerViewFile(filename, isZip = false): Promise<string> {
    try {
      const signUrl = await this.AliOSSClient.signatureUrl(
        `${isZip ? filename : this.getOSSObject(filename)}`,
        {
          expires: 600,
        },
      );
      return signUrl;
    } catch (e) {
      this.logger.error(e, 'ossPerViewFile');
      ResponseTools.fail('文件预览获取失败');
      return '';
    }
  }

  async ossZipFileList(filename: string): Promise<any> {
    const prefix = filename.split('-')[0];
    try {
      const list = await this.AliOSSClient.list({
        prefix: this.getOSSZipsObject(prefix),
      });
      list.objects = (list.objects || []).filter((d) => d.size);
      const subFiles = [];
      await Promise.all(
        list.objects.map(async (v) => {
          const previewUrl = await this.ossPerViewFile(v.name, true);
          subFiles.push({
            ...v,
            type: 'image',
            previewUrl,
          });
        }),
      );
      return subFiles;
    } catch (e) {
      this.logger.error(e, 'ossFileList');
      ResponseTools.fail('文件获取失败');
      return '';
    }
  }
}

export default new AliOss();
