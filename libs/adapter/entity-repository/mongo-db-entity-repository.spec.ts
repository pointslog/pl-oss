import { Collection } from 'mongodb';
import { MongoDBEntityRepository } from './mongo-db-entity-repository';

jest.mock('mongodb', () => ({
  Collection: {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndReplace: jest.fn(),
  },
}));

interface TestEntity { id: string }

describe('MongoDBEntityRepository', () => {
  const id = 'id';
  const testEntity: TestEntity = { id };

  let collection: Collection;
  let testMongoDBEntityRepository: MongoDBEntityRepository<TestEntity>;

  beforeEach(() => {
    collection = Collection;
    testMongoDBEntityRepository = new MongoDBEntityRepository<TestEntity>(collection);
  });

  afterEach(jest.clearAllMocks);

  describe('getAll', () => {
    it('should call getAll', async () => {
      const cursor = { toArray: jest.fn() };
      jest.spyOn(cursor, 'toArray').mockResolvedValue([testEntity]);
      jest.spyOn(collection, 'find').mockReturnValue(cursor);

      const entity = await testMongoDBEntityRepository.getAll();

      expect(entity).toMatchObject([testEntity]);
      expect(collection.find).toHaveBeenCalledTimes(1);
      expect(collection.find).toHaveBeenNthCalledWith(1);
    });
  });

  describe('getById', () => {
    it('should call findOne with id', async () => {
      const filter = { _id: id };

      jest.spyOn(collection, 'findOne').mockResolvedValue(testEntity);

      const entity = await testMongoDBEntityRepository.getById(id);

      expect(entity).toMatchObject(testEntity);
      expect(collection.findOne).toHaveBeenCalledTimes(1);
      expect(collection.findOne).toHaveBeenNthCalledWith(1, filter);
    });
  });

  describe('save', () => {
    it('should call findOneAndReplace with entity', async () => {
      const filter = { _id: id };
      const options = { upsert: true };

      jest.spyOn(collection, 'findOneAndReplace').mockResolvedValue(undefined);

      await testMongoDBEntityRepository.save(testEntity);

      expect(collection.findOneAndReplace).toHaveBeenCalledTimes(1);
      expect(collection.findOneAndReplace)
        .toHaveBeenNthCalledWith(1, filter, testEntity, options);
    });
  });
});
