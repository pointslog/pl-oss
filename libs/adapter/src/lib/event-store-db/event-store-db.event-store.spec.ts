import {
  EventStoreDBClient,
  FORWARDS,
  JSONEventData,
  NO_STREAM,
  ResolvedEvent,
  START,
} from '@eventstore/db-client';
import { Event } from '@pl-oss/domain-core';
import { EventStoreDBEventStore } from './event-store-db.event-store';

jest.mock('@eventstore/db-client', () => ({
  ...(jest.requireActual('@eventstore/db-client')),
  EventStoreDBClient: {
    connectionString: () => ({
      appendToStream: jest.fn(),
      readStream: jest.fn(),
    }),
  },
}));

describe('EventStoreDBEventStore', () => {
  const id = 'id';
  const domainEvents: Event[] = [];
  const jsonEvents: JSONEventData[] = [];
  const resolvedEvents: ResolvedEvent[] = [];
  const stream = `TestAggregate-${id}`;

  let testEventStoreDBClient: EventStoreDBClient;
  let testEventStoreDBEventStore: EventStoreDBEventStore;

  beforeEach(() => {
    testEventStoreDBClient = EventStoreDBClient.connectionString('');
    testEventStoreDBEventStore = new EventStoreDBEventStore(testEventStoreDBClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('append', () => {
    it('should call appendToStream', async () => {
      await testEventStoreDBEventStore.append(stream, domainEvents, -1);
      expect(testEventStoreDBClient.appendToStream).toHaveBeenCalledTimes(1);
      expect(testEventStoreDBClient.appendToStream)
        .toHaveBeenNthCalledWith(1, stream, jsonEvents, { expectedRevision: NO_STREAM });
    });
  });

  describe('read', () => {
    it('should call readStream', async () => {
      const direction = FORWARDS;
      const fromRevision = START;

      jest.spyOn(testEventStoreDBClient, 'readStream').mockResolvedValue(resolvedEvents);

      const events = await testEventStoreDBEventStore.read(stream);

      expect(events).toMatchObject(domainEvents);
      expect(testEventStoreDBClient.readStream).toHaveBeenCalledTimes(1);
      expect(testEventStoreDBClient.readStream)
        .toHaveBeenNthCalledWith(1, stream, { direction, fromRevision });
    });
  });
});
