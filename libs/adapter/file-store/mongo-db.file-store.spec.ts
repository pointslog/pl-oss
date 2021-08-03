import { FileEntity } from '@pl-oss/core';
import { Collection } from 'mongodb';
import { MongoDBFileStore } from './mongo-db.file-store';

jest.mock('mongodb', () => ({
  Collection: {
    insertOne: jest.fn(),
    findOne: jest.fn(),
  },
}));

describe('MongoDBFileStore', () => {
  let entity: FileEntity;
  let collection: Collection;
  let mongoDBFileStore: MongoDBFileStore;

  beforeEach(() => {
    collection = Collection;
    entity = new FileEntity('id', 'data');
    mongoDBFileStore = new MongoDBFileStore(collection);

    const date = new Date();
    jest.useFakeTimers('modern');
    jest.setSystemTime(date);
  });

  afterEach(jest.clearAllMocks);

  describe('append', () => {
    it('should call insertOne', async () => {
      jest.spyOn(collection, 'insertOne');
      await mongoDBFileStore.append(entity);

      expect(collection.insertOne).toHaveBeenCalledTimes(1);
      expect(collection.insertOne).toHaveBeenNthCalledWith(1, { ...entity, _id: 'id' });
    });
  });

  describe('read', () => {
    it('should call findOne', async () => {
      jest.spyOn(collection, 'findOne').mockReturnValue(entity);
      const response = await mongoDBFileStore.read('id');

      expect(response).toMatchObject(entity);
      expect(collection.findOne).toHaveBeenCalledTimes(1);
      expect(collection.findOne).toHaveBeenNthCalledWith(1, { _id: 'id' });
    });
  });
});
