import { EventMetadata } from './event-metadata';

export interface Event {
  readonly type: string
  readonly data: Record<string | number, unknown>
  readonly metadata: EventMetadata
}
