import { MongoClient } from 'mongodb';

export class MongoDBHelper {
  static async getClient(url: string): Promise<MongoClient> {
    const useNewUrlParser = true;
    const useUnifiedTopology = true;
    const config = { useNewUrlParser, useUnifiedTopology };
    const client = new MongoClient(url, config);
    await client.connect();
    return client;
  }
}
