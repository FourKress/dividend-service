import { join } from 'path';

export const getUploadPath = (filename) =>
  `${join(process.cwd(), 'uploads')}/${filename}`;
