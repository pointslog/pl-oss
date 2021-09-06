import { Event, EventLog } from '@pl-oss/core';
import { Collection } from 'mongodb';

const bigintReplacer = (_k: string, v: unknown) => (typeof v === 'bigint' ? `${v.toString()}n` : v);

export class MongoDBEventLog implements EventLog {
  constructor(private readonly collection: Collection) {}

  async clear(): Promise<void> {
    await this.collection.drop();
  }

  async log(event: Event, metadata?: unknown): Promise<void> {
    const filter = { _id: event.id };
    const options = { upsert: true };
    const document = { event, metadata: JSON.stringify(metadata, bigintReplacer) };
    await this.collection.findOneAndReplace(filter, document, options);
  }
}
