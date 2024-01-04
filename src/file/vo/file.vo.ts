import { IFile } from '../interface/file.interface';

export class FileVo {
  constructor(proxyGrant: IFile) {
    this.id = String(proxyGrant.id);
    this.name = proxyGrant.name;
    this.mimetype = proxyGrant.mimetype;
    this.url = proxyGrant.url;
    this.previewUrl = proxyGrant.previewUrl;
    this.downloadUrl = proxyGrant.downloadUrl;
  }

  readonly id: string;
  readonly name: string;
  readonly mimetype: string;
  readonly url: string;
  readonly previewUrl: string;
  readonly downloadUrl: string;
}
