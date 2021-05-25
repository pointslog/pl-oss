import { Event } from './event';

export interface EventListener {
  eventTypePrefixes: string[]
  on(event: Event): Promise<void>
}
