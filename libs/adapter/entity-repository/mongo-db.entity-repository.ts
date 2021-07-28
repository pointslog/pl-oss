import { EntityRepository, Entity } from '@pl-oss/domain';
import { Collection } from 'mongodb';

export class MongoDBRepository<T extends Entity> implements EntityRepository<T> {
  constructor(private readonly collection: Collection) {}

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
