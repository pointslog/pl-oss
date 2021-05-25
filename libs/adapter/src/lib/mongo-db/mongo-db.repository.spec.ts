import { Collection } from 'mongodb';
import { MongoDBRepository } from './mongo-db.repository';

jest.mock('mongodb', () => ({
  ...(jest.requireActual('mongodb')),
  Collection: {
    findOne: jest.fn(),
    findOneAndReplace: jest.fn(),
  },
}));

interface TestEntity { id: string }

describe('MongoDBRepository', () => {
  const id = 'id';
  const testEntity: TestEntity = { id };

  let testCollection: Collection;
  let testEntityMongoDBRepository: MongoDBRepository<TestEntity>;

  beforeEach(() => {
    testCollection = Collection;
    testEntityMongoDBRepository = new MongoDBRepository<TestEntity>(testCollection);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should call findOne with id', async () => {
      const filterQuery = { _id: id };

      jest.spyOn(testCollection, 'findOne').mockResolvedValue(testEntity);

      const entity = await testEntityMongoDBRepository.getById(id);

      expect(entity).toMatchObject(testEntity);
      expect(testCollection.findOne).toHaveBeenCalledTimes(1);
      expect(testCollection.findOne).toHaveBeenNthCalledWith(1, filterQuery);
    });
  });

  describe('save', () => {
    it('should call findOneAndReplace with entity', async () => {
      const filterQuery = { _id: id };
      const options = { upsert: true };

      jest.spyOn(testCollection, 'findOneAndReplace').mockResolvedValue(undefined);

      await testEntityMongoDBRepository.save(testEntity);

      expect(testCollection.findOneAndReplace).toHaveBeenCalledTimes(1);
      expect(testCollection.findOneAndReplace)
        .toHaveBeenNthCalledWith(1, filter, testEntity, options);
    });
  });
});
