import { MongoClient } from 'mongodb';

export async function createAndGetClient(url: string): Promise<MongoClient> {
  const client = new MongoClient(url);
  await client.connect();
  return client;
}
