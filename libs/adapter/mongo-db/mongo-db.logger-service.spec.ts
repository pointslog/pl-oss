import { mock } from 'jest-mock-extended';
import { Collection } from 'mongodb';
import { MongoDBLoggerService } from './mongo-db.logger-service';

jest.mock('mongodb', () => ({
  Collection: { insertOne: jest.fn() },
}));

describe('MongoDBLoggingService', () => {
  let collection: Collection;
  let service: MongoDBLoggerService;

  beforeEach(() => {
    collection = mock<Collection>();
    service = new MongoDBLoggerService(collection);
  });

  afterEach(jest.clearAllMocks);

  describe('log', () => {
    it('should call insertOne with message and payload', async () => {
      const date = new Date();
      jest.useFakeTimers('modern');
      jest.setSystemTime(date);

      await service.log('message', {});

      expect(collection.insertOne).toHaveBeenCalledTimes(1);
      expect(collection.insertOne).toHaveBeenNthCalledWith(1, { message: 'message', payload: {}, timestamp: date });
    });
  });
});
