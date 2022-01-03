import { FileEntity } from './file-entity';

export interface FileStore {
  save(fileEntity: FileEntity): Promise<void>;
  read(id: string): Promise<FileEntity>;
}
