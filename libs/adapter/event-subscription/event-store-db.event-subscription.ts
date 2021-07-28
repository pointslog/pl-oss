import { EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { EventListener, EventSubscription, Event } from '@pl-oss/domain';

export class EventStoreDBEventSubscription implements EventSubscription {
  constructor(private readonly client: EventStoreDBClient) {}

  async register(listener: EventListener): Promise<void> {
    const prefixes = listener.getStreamNamePrefixes();
    const filter = streamNameFilter({ prefixes });
    const subscription = this.client.subscribeToAll({ filter });

    // eslint-disable-next-line no-restricted-syntax
    for await (const { event } of subscription) {
      await listener.on(event.data as unknown as Event);
    }
  }
}
