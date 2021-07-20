import { Collection } from 'mongodb';
import { FileEntity } from '../../file-helper/lib/file.entity';
import { MongoDBFileStore } from './mongo-db.file-store';
import { IdShouldBeUniqueException } from '../../file-helper/lib/id-should-be-unique.exception';

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
      jest.spyOn(collection, 'insertOne').mockResolvedValue(undefined);

      await mongoDBFileStore.append(entity);

      expect(collection.insertOne).toHaveBeenCalledTimes(1);
      expect(collection.insertOne).toHaveBeenNthCalledWith(1, { ...entity, _id: 'id' });
    });

    it('should throw IdShouldBeUniqueException', async () => {
      jest.spyOn(collection, 'insertOne').mockImplementation(() => {
        const error = new Error('message');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        error.code = 11000;
        throw error;
      });

      await mongoDBFileStore.append(entity);

      expect(mongoDBFileStore.append.bind(mongoDBFileStore))
        .toThrowError(new IdShouldBeUniqueException());
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
