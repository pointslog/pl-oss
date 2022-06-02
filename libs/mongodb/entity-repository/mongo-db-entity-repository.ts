import { EntityRepository, Entity } from '@pl-oss/core';
import {
  Collection, Filter, WithId,
} from 'mongodb';

export class MongoDBEntityRepository<T extends Entity> implements EntityRepository<T> {
  constructor(protected readonly collection: Collection<T>) {}

  async getAll(): Promise<T[]> {
    const withIdEntities = await this.collection.find().toArray();
    return withIdEntities.map(this.toEntity);
  }

  async getById(id: string): Promise<T> {
    const filter = { id };
    const withIdEntity = await this.collection.findOne(filter as unknown as Filter<T>);
    return this.toEntity(withIdEntity);
  }

  async save(entity: T): Promise<void> {
    const filter = { id: entity.id };
    const options = { upsert: true };
    await this.collection.findOneAndReplace(filter as unknown as Filter<T>, entity, options);
  }

  // eslint-disable-next-line class-methods-use-this
  private toEntity({ _id, ...entity }: WithId<T>): T {
    return entity as unknown as T;
  }
}
