import { EventMetadata } from '../lib/event-metadata';
import { Event } from '../lib/event';

export class TestEvent implements Event {
  readonly type = 'TestEvent'
  readonly data: { readonly id: string }
  readonly metadata: EventMetadata

  constructor(id: string) {
    this.data = { id };
    this.metadata = { timestamp: new Date() };
  }
}
