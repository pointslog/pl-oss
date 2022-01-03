import { FileEntity, FileStore, UnimplementedException } from '@pl-oss/core';
import fetch from 'node-fetch';
import { NetworkException } from './network-exception';

export const urlFileStore: FileStore = {
  async save(): Promise<void> {
    throw new UnimplementedException();
  },

  async read(id: string): Promise<FileEntity> {
    const response = await fetch(id);
    if (response.status !== 200) throw new NetworkException();
    const buffer = await response.buffer();
    const contentType = response.headers.get('content-type');
    const base64Data = `data:${contentType};base64,${buffer.toString('base64')}`;
    return new FileEntity(id, base64Data);
  },
};
