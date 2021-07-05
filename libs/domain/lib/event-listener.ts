import { Event } from './event';

export abstract class EventListener {
  abstract getStreamPrefixes(): string[]

  async on(event: Event): Promise<void> {
    const methodName = `on${event.type}`;
    if (this[methodName]) await this[methodName](event);
  }
}
