import { Collection } from 'mongodb';
import { LoggingService } from '@pl-oss/domain';

export class MongoDBLoggingService implements LoggingService {
  constructor(private readonly collection: Collection) {}

  async log(message: string, payload?: unknown, timestamp = new Date()): Promise<void> {
    await this.collection.insertOne({ message, payload, timestamp });
  }
}
