import { EntityRepository, Entity } from '@pl-oss/domain';

export class InMemoryEntityRepository<T extends Entity> implements EntityRepository<T> {
  constructor(private readonly entityMap: Record<string, T> = {}) {}

  async getAll(): Promise<T[]> {
    return Object.values(this.entityMap);
  }

  async getById(id: string): Promise<T> {
    return this.entityMap[id];
  }

  async save(entity: T): Promise<void> {
    this.entityMap[entity.id] = entity;
  }
}
