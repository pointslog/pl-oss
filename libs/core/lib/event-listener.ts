import { Event } from './event';

export abstract class EventListener {
  abstract getStreamNamePrefixes(): string[];

  async on(event: Event, metadata?: unknown): Promise<void> {
    const methodName = `on${event.type}`;
    if (this[methodName]) await this[methodName](event, metadata);
  }
}
