import { Event } from './event';
import { EventStore } from './event-store';

export abstract class Aggregate {
  abstract readonly streamNamePrefix: string;

  revision: number;
  uncommitedEvents: Event[];

  constructor(readonly id: string) {
    this.reset();
  }

  async commit(eventStore: EventStore): Promise<this> {
    await eventStore.append(this.streamName, this.uncommitedEvents, this.expectedRevision);
    this.resetUncommitedEvents();
    return this;
  }

  async load(eventStore: EventStore): Promise<this> {
    this.reset();
    const events = await eventStore.read(this.streamName);
    events.forEach((event) => { this.applyEvent(event); });
    return this;
  }

  protected raiseEvent(event: Event): void {
    this.applyEvent(event);
    this.uncommitedEvents.push(event);
  }

  private get expectedRevision(): number {
    return this.revision - this.uncommitedEvents.length;
  }

  private get streamName(): string {
    return `${this.streamNamePrefix}-${this.id}`;
  }

  private applyEvent(event: Event): void {
    const methodName = `on${event.type}`;
    if (this[methodName]) this[methodName](event);
    this.revision += 1;
  }

  private resetUncommitedEvents(): void {
    this.uncommitedEvents = [];
  }

  private reset(): void {
    this.revision = -1;
    this.resetUncommitedEvents();
  }
}
