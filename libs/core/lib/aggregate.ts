import { Event } from './event';
import { EventStore } from './event-store';

export abstract class Aggregate {
  abstract readonly streamNamePrefix: string;

  revision: number;
  uncommittedEvents: Event[];

  constructor(readonly id: string) {
    this.reset();
  }

  async commit(eventStore: EventStore): Promise<this> {
    await eventStore.append(this.streamName, this.uncommittedEvents, this.expectedRevision);
    this.resetUncommittedEvents();
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
    this.uncommittedEvents.push(event);
  }

  private get expectedRevision(): number {
    return this.revision - this.uncommittedEvents.length;
  }

  private get streamName(): string {
    return `${this.streamNamePrefix}-${this.id}`;
  }

  private applyEvent(event: Event): void {
    const methodName = `on${event.type}`;
    if (this[methodName]) this[methodName](event);
    this.revision += 1;
  }

  private resetUncommittedEvents(): void {
    this.uncommittedEvents = [];
  }

  private reset(): void {
    this.revision = -1;
    this.resetUncommittedEvents();
  }
}
