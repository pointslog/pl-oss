import { Event } from './event';
import { EventStore } from './event-store';

export abstract class Aggregate {
  abstract readonly streamNamePrefix: string

  revision = -1
  uncommitedEvents: Event[] = []

  constructor(readonly id: string) {}

  async commit(eventStore: EventStore) {
    await eventStore.append(this.streamName, this.uncommitedEvents, this.expectedRevision);
    this.resetUncommitedEvents();
  }

  async load(eventStore: EventStore) {
    const events = await eventStore.read(this.streamName);
    events.forEach((event) => { this.applyEvent(event); });
    return this;
  }

  protected raiseEvent(event: Event) {
    this.applyEvent(event);
    this.uncommitedEvents.push(event);
  }

  private get expectedRevision(): number {
    return this.revision - this.uncommitedEvents.length;
  }

  private get streamName(): string {
    return `${this.streamNamePrefix}-${this.id}`;
  }

  private applyEvent(event: Event) {
    const methodName = `apply${event.type}`;
    if (this[methodName]) this[methodName](event);
    this.revision += 1;
  }

  private resetUncommitedEvents() {
    this.uncommitedEvents = [];
  }
}
