import { EventStoreDBClient, streamNameFilter, ReadPosition } from '@eventstore/db-client';
import { EventListener, EventSubscription, Event } from '@pl-oss/core';

const bigintReplacer = (_k: string, v: unknown) => (typeof v === 'bigint' ? `${v.toString()}n` : v);

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
      const { data, ...metadataRaw } = payload.event;
      const metadata = JSON.parse(JSON.stringify(metadataRaw, bigintReplacer));
      await listener.on(data as unknown as Event, metadata);
    }
  }
}
