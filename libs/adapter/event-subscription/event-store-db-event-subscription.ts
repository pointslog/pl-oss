import { EventStoreDBClient, streamNameFilter, ReadPosition } from '@eventstore/db-client';
import { EventListener, EventSubscription, Event } from '@pl-oss/core';

export class EventStoreDBEventSubscription implements EventSubscription {
  constructor(
    private readonly client: EventStoreDBClient,
    private readonly fromPosition: ReadPosition,
  ) {}

  async register(listener: EventListener): Promise<void> {
    const prefixes = listener.getStreamNamePrefixes();
    const subscription = this.client.subscribeToAll({
      filter: streamNameFilter({ prefixes }),
      fromPosition: this.fromPosition,
    });

    // eslint-disable-next-line no-restricted-syntax
    for await (const payload of subscription) {
      const { data, ...metadata } = payload.event;
      await listener.on(data as unknown as Event, metadata);
    }
  }
}
