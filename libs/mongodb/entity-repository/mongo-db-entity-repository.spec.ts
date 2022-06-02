import { mock } from 'jest-mock-extended';
import {
  Collection, FindCursor, MongoClient, WithId,
} from 'mongodb';
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

  let connection;
  let collection: Collection<TestEntity>;
  let repository: MongoDBEntityRepository<TestEntity>;

  beforeAll(() => {
    connection = mock<MongoClient>();
    collection = mock<Collection<TestEntity>>();
    connection.db = mock<any>();
    connection.db.collection = jest.fn(() => collection);
    repository = new MongoDBEntityRepository<TestEntity>(connection);
  });

  beforeEach(async () => {
    repository = new MongoDBEntityRepository<TestEntity>(collection);
  });

  afterEach(jest.clearAllMocks);

  afterAll(() => {
    connection.close();
  });

  describe('getAll', () => {
    it('should call getAll', async () => {
      const cursor = mock<FindCursor<WithId<TestEntity>>>();
      jest.spyOn(collection, 'find').mockReturnValue(cursor);
      jest.spyOn(cursor, 'toArray').mockResolvedValue([testEntity as WithId<TestEntity>]);

      const entity = await repository.getAll();

      expect(entity).toMatchObject([testEntity]);
      expect(collection.find).toHaveBeenCalledTimes(1);
      expect(collection.find).toHaveBeenNthCalledWith(1);
    });
  });

  describe('getById', () => {
    it('should call findOne with id', async () => {
      const filter = { id };
      jest.spyOn(collection, 'findOne').mockResolvedValueOnce(testEntity as unknown as never);
      const entity = await repository.getById(id);

      expect(entity).toMatchObject(testEntity);
      expect(collection.findOne).toHaveBeenCalledTimes(1);
      expect(collection.findOne).toHaveBeenNthCalledWith(1, filter);
    });
  });

  describe('save', () => {
    it('should call findOneAndReplace with entity', async () => {
      const filter = { id };
      const options = { upsert: true };

      jest.spyOn(collection, 'findOneAndReplace').mockImplementation(jest.fn);
      await repository.save(testEntity);

      expect(collection.findOneAndReplace).toHaveBeenCalledTimes(1);
      expect(collection.findOneAndReplace)
        .toHaveBeenNthCalledWith(1, filter, testEntity, options);
    });
  });
});
