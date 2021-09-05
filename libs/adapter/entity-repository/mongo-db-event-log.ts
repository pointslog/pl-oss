import { Event, EventLog } from '@pl-oss/core';
import { Collection } from 'mongodb';

export class MongoDBEventLog implements EventLog {
  constructor(private readonly collection: Collection) {}

  async clear(): Promise<void> {
    await this.collection.drop();
  }

  async log(event: Event): Promise<void> {
    await this.collection.insertOne(event);
  }
}
