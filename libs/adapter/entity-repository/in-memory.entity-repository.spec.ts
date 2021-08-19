import { InMemoryEntityRepository } from './in-memory.entity-repository';

interface TestEntity { id: string }

describe('InMemoryEntityRepository', () => {
  const id = 'id';
  const testEntity: TestEntity = { id };

  let entityMap: Record<string, TestEntity>;
  let testEntityInMemoryRepository: InMemoryEntityRepository<TestEntity>;

  beforeEach(() => {
    entityMap = { testEntity };
    testEntityInMemoryRepository = new InMemoryEntityRepository<TestEntity>(entityMap);
  });

  afterEach(jest.clearAllMocks);

  describe('getAll', () => {
    it('should call getAll', async () => {
      // jest.spyOn().mockResolvedValue();
      const entity = await testEntityInMemoryRepository.getAll();

      expect(entity).toMatchObject([testEntity]);
      expect(entity.values).toHaveBeenCalledTimes(1);
      expect(entity.values).toHaveBeenNthCalledWith(1);
    });
  });
});
