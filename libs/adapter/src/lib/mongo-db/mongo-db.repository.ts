import { Collection } from 'mongodb';

export class MongoDBRepository<T extends { id: string }> {
  constructor(private readonly collection: Collection) {}

  async getById(id: string): Promise<T> {
    const filterQuery = { _id: id };
    return this.collection.findOne(filterQuery);
  }

  async save(entity: T): Promise<void> {
    const filter = { _id: entity.id };
    const options = { upsert: true };
    await this.collection.findOneAndReplace(filter, entity, options);
  }
}
