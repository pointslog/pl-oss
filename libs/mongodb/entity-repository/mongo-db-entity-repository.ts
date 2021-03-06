import { EntityRepository, Entity } from '@pl-oss/core';
import { Collection } from 'mongodb';

export class MongoDBEntityRepository<T extends Entity> implements EntityRepository<T> {
  constructor(protected readonly collection: Collection) {}

  getAll(): Promise<T[]> {
    return this.collection.find().toArray();
  }

  getById(id: string): Promise<T> {
    const filter = { _id: id };
    return this.collection.findOne(filter);
  }

  async save(entity: T): Promise<void> {
    const filter = { _id: entity.id };
    const options = { upsert: true };
    await this.collection.findOneAndReplace(filter, entity, options);
  }
}
