import {
  EventStoreDBClient,
  FORWARDS,
  JSONEventData,
  NO_STREAM,
  ResolvedEvent,
  START,
} from '@eventstore/db-client';
import { Event as DomainEvent } from '@pl-oss/core';
import { EventStoreDBEventStore } from './event-store-db.event-store';

jest.mock('@eventstore/db-client', () => ({
  ...jest.requireActual<Record<string, unknown>>('@eventstore/db-client'),
  EventStoreDBClient: {
    connectionString: () => ({
      appendToStream: jest.fn(),
      readStream: jest.fn(),
    }),
  },
}));

describe('EventStoreDBEventStore', () => {
  const id = 'id';
  const domainEvents: DomainEvent[] = [];
  const jsonEvents: JSONEventData[] = [];
  const resolvedEvents: ResolvedEvent[] = [];
  const stream = `TestAggregate-${id}`;

  let testEventStoreDBClient: EventStoreDBClient;
  let testEventStoreDBEventStore: EventStoreDBEventStore;

  beforeEach(() => {
    testEventStoreDBClient = EventStoreDBClient.connectionString('');
    testEventStoreDBEventStore = new EventStoreDBEventStore(testEventStoreDBClient);
  });

  afterEach(jest.clearAllMocks);

  describe('determineExpectedRevision', () => {
    it('should return NO_STREAM if revision is -1', async () => {
      const revision = -1;
      const expectedRevision = EventStoreDBEventStore.determineExpectedRevision(revision);
      expect(expectedRevision).toStrictEqual(NO_STREAM);
    });

    it('should return BigInt if revision is anything but -1', async () => {
      const revision = 1;
      const expectedRevision = EventStoreDBEventStore.determineExpectedRevision(revision);
      expect(expectedRevision).toStrictEqual(BigInt(revision));
    });
  });

  describe('mapEventToJsonEvent', () => {
    it('should map domain event to json event', async () => {
      const mappedJsonEvents = domainEvents.map(EventStoreDBEventStore.mapEventToJsonEvent);
      expect(mappedJsonEvents).toStrictEqual(jsonEvents);
    });
  });

  describe('mapResolvedEventToEvent', () => {
    it('should map resolved event to domain event', async () => {
      const mappedDomainEvents = resolvedEvents.map(EventStoreDBEventStore.mapResolvedEventToEvent);
      expect(mappedDomainEvents).toStrictEqual(domainEvents);
    });
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
