import { InMemoryEntityRepository } from './in-memory-entity-repository';

describe('InMemoryEntityRepository', () => {
  let entityRepository: InMemoryEntityRepository<{ id: string }>;

  beforeEach(() => {
    entityRepository = new InMemoryEntityRepository({ id: { id: 'id' } });
  });

  afterEach(jest.clearAllMocks);

  describe('getAll', () => {
    it('should return all entities', async () => {
      const result = await entityRepository.getAll();
      expect(result).toStrictEqual([{ id: 'id' }]);
    });
  });

  describe('getById', () => {
    it('should return entity by id', async () => {
      const result = await entityRepository.getById('id');
      expect(result).toStrictEqual({ id: 'id' });
    });
  });

  describe('save', () => {
    it('should save new value of entity', async () => {
      await entityRepository.save({ id: 'id1' });
      const result = await entityRepository.getById('id1');
      expect(result).toStrictEqual({ id: 'id1' });
    });
  });
});
