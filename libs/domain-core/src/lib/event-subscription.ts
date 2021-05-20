import { EventListener } from './event-listener';

export interface EventSubscription {
  register(listener: EventListener): void
}
