import { Event } from './event';

export interface EventLog {
  clear(): Promise<void>;
  log(event: Event): Promise<void>;
}
