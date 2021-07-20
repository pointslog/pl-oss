import { Context } from '@pl-oss/domain';
import { FileStore } from './file-store';

export interface FileContext extends Context {
  fileStore?: FileStore,
}
