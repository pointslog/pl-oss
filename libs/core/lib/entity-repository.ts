import { Entity } from './entity';

export interface EntityRepository<T extends Entity> {
  getAll(): Promise<T[]>;
  getById(id: string): Promise<T>;
  save(entity: T): Promise<void>;
}
