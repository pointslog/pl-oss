import { Collection } from 'mongodb';
import { MongoDBRepository } from './mongo-db.entity-repository';

jest.mock('mongodb', () => ({
  Collection: {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneAndReplace: jest.fn(),
  },
}));

interface TestEntity { id: string }

describe('MongoDBRepository', () => {
  const id = 'id';
  const testEntity: TestEntity = { id };

  let collection: Collection;
  let testEntityMongoDBRepository: MongoDBRepository<TestEntity>;

  beforeEach(() => {
    collection = Collection;
    testEntityMongoDBRepository = new MongoDBRepository<TestEntity>(collection);
  });

  afterEach(jest.clearAllMocks);

  describe('getAll', () => {
    it('should call getAll', async () => {
      const cursor = { toArray: jest.fn() };
      jest.spyOn(cursor, 'toArray').mockResolvedValue([testEntity]);
      jest.spyOn(collection, 'find').mockReturnValue(cursor);

      const entity = await testEntityMongoDBRepository.getAll();

      expect(entity).toMatchObject([testEntity]);
      expect(collection.find).toHaveBeenCalledTimes(1);
      expect(collection.find).toHaveBeenNthCalledWith(1);
    });
  });

  describe('getById', () => {
    it('should call findOne with id', async () => {
      const filter = { _id: id };

      jest.spyOn(collection, 'findOne').mockResolvedValue(testEntity);

      const entity = await testEntityMongoDBRepository.getById(id);

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

      await testEntityMongoDBRepository.save(testEntity);

      expect(collection.findOneAndReplace).toHaveBeenCalledTimes(1);
      expect(collection.findOneAndReplace)
        .toHaveBeenNthCalledWith(1, filter, testEntity, options);
    });
  });
});
