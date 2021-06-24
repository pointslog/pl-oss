import { MongoClient } from 'mongodb';
import { MongoDBHelper } from './mongo-db.helper';

const mongoClient = { connect: jest.fn() };

jest.mock('mongodb', () => ({
  MongoClient: jest.fn().mockImplementation(() => mongoClient),
}));

describe('MongoDBHelper', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getMongoDBClient', () => {
    it('should instantiate mongoClient and call connect', async () => {
      const url = 'url';
      const useNewUrlParser = true;
      const useUnifiedTopology = true;
      const config = { useNewUrlParser, useUnifiedTopology };

      const client = await MongoDBHelper.getMongoDBClient(url);

      expect(client).toMatchObject(mongoClient);
      expect(MongoClient).toHaveBeenCalledTimes(1);
      expect(MongoClient).toHaveBeenNthCalledWith(1, url, config);
      expect(mongoClient.connect).toHaveBeenCalledTimes(1);
      expect(mongoClient.connect).toHaveBeenNthCalledWith(1);
    });
  });
});
