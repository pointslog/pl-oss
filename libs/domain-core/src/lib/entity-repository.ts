import { Entity } from './entity';

export interface EntityRepository<T extends Entity> {
  getById(id: string): Promise<T>
  save(entity: T): Promise<void>
}
