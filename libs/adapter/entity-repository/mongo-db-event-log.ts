import { Event, EventLog } from '@pl-oss/core';
import { Collection } from 'mongodb';

export class MongoDBEventLog implements EventLog {
  constructor(private readonly collection: Collection) {}

  async clear(): Promise<void> {
    await this.collection.drop();
  }

  async log(event: Event): Promise<void> {
    const filter = { _id: event.id };
    const options = { upsert: true };
    await this.collection.findOneAndReplace(filter, event, options);
  }
}