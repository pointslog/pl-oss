import { EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { EventListener, EventSubscription, Event } from '@pl-oss/core';

export class EventStoreDBEventSubscription implements EventSubscription {
  constructor(private readonly client: EventStoreDBClient) {}

  async register(listener: EventListener): Promise<void> {
    const prefixes = listener.getStreamNamePrefixes();
    const filter = streamNameFilter({ prefixes });
    const subscription = this.client.subscribeToAll({ filter });

    // eslint-disable-next-line no-restricted-syntax
    for await (const payload of subscription) {
      const { data, ...metadata } = payload.event;
      await listener.on(data as unknown as Event, metadata);
    }
  }
}
