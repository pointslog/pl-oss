import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONEventData,
  NO_STREAM,
  ResolvedEvent,
  START,
} from '@eventstore/db-client';
import { EventStore, Event as DomainEvent } from '@pl-oss/domain';

export class EventStoreDBEventStore implements EventStore {
  constructor(private readonly eventStoreDBClient: EventStoreDBClient) {}

  static determineExpectedRevision(revision: number): typeof NO_STREAM | bigint {
    return revision === -1 ? NO_STREAM : BigInt(revision);
  }

  static mapEventToJsonEvent(event: DomainEvent): JSONEventData {
    return jsonEvent({
      type: event.type,
      data: event as unknown as Record<string, unknown>,
    });
  }

  static mapResolvedEventToEvent(event: ResolvedEvent): DomainEvent {
    return event.event as unknown as DomainEvent;
  }

  async append(stream: string, events: DomainEvent[], expectedRevision: number): Promise<void> {
    const jsonEvents = events.map(EventStoreDBEventStore.mapEventToJsonEvent);
    const determinedRevision = EventStoreDBEventStore.determineExpectedRevision(expectedRevision);
    await this.eventStoreDBClient
      .appendToStream(stream, jsonEvents, { expectedRevision: determinedRevision });
  }

  async read(stream: string): Promise<DomainEvent[]> {
    const direction = FORWARDS;
    const fromRevision = START;
    const resolvedEvents = await this.eventStoreDBClient
      .readStream(stream, { direction, fromRevision });
    return resolvedEvents.map(EventStoreDBEventStore.mapResolvedEventToEvent);
  }
}
