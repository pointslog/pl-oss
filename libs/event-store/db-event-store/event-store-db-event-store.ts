import {
  EventStoreDBClient,
  FORWARDS,
  jsonEvent,
  JSONEventData,
  JSONEventType,
  NO_STREAM,
  ResolvedEvent,
  START,
} from '@eventstore/db-client';
import { EventStore, Event as DomainEvent } from '@pl-oss/core';
import { IncorrectAggregateVersionException } from '../exception/incorrect-aggregate-version-exception';

export class EventStoreDBEventStore implements EventStore {
  constructor(
    private readonly eventStoreDBClient: EventStoreDBClient,
    private readonly skipVersionCheck: boolean = false,
  ) {}

  static determineExpectedRevision(revision: number): typeof NO_STREAM | bigint {
    return revision === -1 ? NO_STREAM : BigInt(revision);
  }

  static mapEventToJsonEvent(event: DomainEvent): JSONEventData {
    const { id, type } = event;
    const data = event as unknown as Record<string, unknown>;
    return jsonEvent({ id, type, data });
  }

  static mapResolvedEventToEvent(event: ResolvedEvent): DomainEvent {
    return event.event.data as unknown as DomainEvent;
  }

  async append(stream: string, events: DomainEvent[], expectedRevision: number): Promise<void> {
    const jsonEvents = events.map(EventStoreDBEventStore.mapEventToJsonEvent);
    const determinedRevision = EventStoreDBEventStore.determineExpectedRevision(expectedRevision);
    const options = this.skipVersionCheck ? {} : { expectedRevision: determinedRevision };
    try {
      await this.eventStoreDBClient.appendToStream(stream, jsonEvents, options);
    } catch (e) {
      if (e.type === 'wrong-expected-version') {
        throw new IncorrectAggregateVersionException(
          e.actualVersion,
          e.expectedVersion,
          e.streamName,
          e,
        );
      }
    }
  }

  async read(stream: string): Promise<DomainEvent[]> {
    const domainEvents:DomainEvent[] = [];
    const direction = FORWARDS;
    const fromRevision = START;
    const resolvedEvents = await this.eventStoreDBClient
      .readStream<JSONEventType>(stream, { direction, fromRevision });

    for await (const event of resolvedEvents) {
      domainEvents.push(EventStoreDBEventStore.mapResolvedEventToEvent(event));
    }

    return domainEvents;
  }
}
