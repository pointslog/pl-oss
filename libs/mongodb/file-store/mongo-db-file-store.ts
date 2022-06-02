import { FileEntity, FileStore, IdShouldBeUniqueException } from '@pl-oss/core';
import { Collection, WithId } from 'mongodb';

export class MongoDBFileStore implements FileStore {
  constructor(private readonly collection: Collection<FileEntity>) {}

  async save(fileEntity: FileEntity): Promise<void> {
    try {
      const withMongoId: WithId<FileEntity> = { ...fileEntity, _id: fileEntity.id };
      await this.collection.insertOne(withMongoId);
    } catch (e) {
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (e?.code === DUPLICATE_KEY_ERROR_CODE) throw new IdShouldBeUniqueException();
    }
  }

  read(id: string): Promise<FileEntity> {
    const filter = { id };
    return this.collection.findOne(filter);
  }
}
