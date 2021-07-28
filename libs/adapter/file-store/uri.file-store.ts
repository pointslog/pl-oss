import { FileEntity, FileStore, UnimplementedException } from '@pl-oss/domain';
import fetch from 'node-fetch';

export class URIFileStore implements FileStore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  async append(fileEntity: FileEntity): Promise<void> {
    throw new UnimplementedException();
  }

  // eslint-disable-next-line class-methods-use-this
  async read(id: string): Promise<FileEntity> {
    const response = await fetch(id);
    const buffer = await response.buffer();
    const contentType = await response.headers.get('content-type');
    const base64Data = `data:${contentType};base64,${buffer.toString('base64')}`;
    return new FileEntity(id, base64Data);
  }
}
