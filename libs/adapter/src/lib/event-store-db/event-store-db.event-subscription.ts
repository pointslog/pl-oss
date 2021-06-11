import { EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { EventListener, EventSubscription, Event } from '@pl-oss/domain-core';

export class EventStoreDBEventSubscription implements EventSubscription {
  constructor(private readonly client: EventStoreDBClient) {}

  async register(listener: EventListener): Promise<void> {
    const prefixes = listener.getEventTypePrefixes();
    const filter = streamNameFilter({ prefixes });
    const subscription = this.client.subscribeToAll({ filter });

    // eslint-disable-next-line no-restricted-syntax
    for await (const { event } of subscription) {
      await listener.on(event as unknown as Event);
    }
  }
}
