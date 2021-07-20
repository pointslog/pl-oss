import { FileEntity } from './file.entity';

export interface FileStore {
  append(fileEntity: FileEntity): Promise<void>
  read(id: string): Promise<FileEntity>
}
