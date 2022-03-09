import { MongoClient } from 'mongodb';

export class MongoDBHelper {
  static async getClient(url: string): Promise<MongoClient> {
    const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    return client;
  }
}
