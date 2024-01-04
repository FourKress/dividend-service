import { FileEntity } from '../entity/file.entity';

export interface IFile extends FileEntity {
  previewUrl: string;
  downloadUrl: string;
  url: string;
}
