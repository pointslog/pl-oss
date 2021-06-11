import { Entity } from './entity';

export interface EntityRepository {
  getById(id: string): Promise<Entity>
  save(entity: Entity): Promise<void>
}
