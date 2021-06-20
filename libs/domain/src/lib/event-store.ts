import { Event } from './event';

export interface EventStore {
  append(stream: string, events: Event[], expectedRevision: number): Promise<void>
  read(stream: string): Promise<Event[]>
}
