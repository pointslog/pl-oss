import { EventMetadata } from './event-metadata';

export interface Event {
  readonly type: string
  readonly data: unknown
  readonly metadata: EventMetadata
}
