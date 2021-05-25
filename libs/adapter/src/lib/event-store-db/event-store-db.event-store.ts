import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONEventData,
  JSONType,
  NO_STREAM,
  ResolvedEvent,
  START,
} from '@eventstore/db-client';
import { EventStore, Event } from '@pl-oss/domain-core';

export class EventStoreDBEventStore implements EventStore {
  constructor(private readonly eventStoreDBClient: EventStoreDBClient) {}

  async append(stream: string, events: Event[], expectedRevision: number): Promise<void> {
    const jsonEvents = events.map(EventStoreDBEventStore.mapEventToJsonEvent);
    const determinedRevision = EventStoreDBEventStore.determineExpectedRevision(expectedRevision);
    await this.eventStoreDBClient
      .appendToStream(stream, jsonEvents, { expectedRevision: determinedRevision });
  }

  async read(stream: string): Promise<Event[]> {
    const direction = FORWARDS;
    const fromRevision = START;
    const resolvedEvents = await this.eventStoreDBClient
      .readStream(stream, { direction, fromRevision });
    return resolvedEvents.map(EventStoreDBEventStore.mapResolvedEventToEvent);
  }

  private static determineExpectedRevision(revision: number): typeof NO_STREAM | bigint {
    return revision === -1 ? NO_STREAM : BigInt(revision);
  }

  private static mapEventToJsonEvent(event: Event): JSONEventData {
    const type = event.constructor.name;
    const data = event.data as JSONType;
    const { metadata } = event;
    return jsonEvent({ type, data, metadata });
  }

  private static mapResolvedEventToEvent(event: ResolvedEvent): Event {
    return event.event as unknown as Event;
  }
}
