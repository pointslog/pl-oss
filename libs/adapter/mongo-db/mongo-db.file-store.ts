import { Collection } from 'mongodb';
import { FileEntity, FileStore, IdShouldBeUniqueException } from '@pl-oss/file-helper';

export class MongoDBFileStore implements FileStore {
  constructor(private readonly collection: Collection) {}

  async append(fileEntity: FileEntity): Promise<void> {
    try {
      const withMongoId = { ...fileEntity, _id: fileEntity.id };
      await this.collection.insertOne(withMongoId);
    } catch (e) {
      console.log(e);
      const DUPLICATE_KEY_ERROR_CODE = 11000;
      if (e?.code === DUPLICATE_KEY_ERROR_CODE) throw new IdShouldBeUniqueException();
    }
  }

  read(id: string): Promise<FileEntity> {
    const filter = { _id: id };
    return this.collection.findOne(filter);
  }
}
