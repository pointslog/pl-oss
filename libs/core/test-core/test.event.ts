import { Event } from '../lib/event';

export class TestEvent implements Event {
  readonly type = 'TestEvent';

  constructor(
    readonly id: string,
    readonly by: string,
    readonly timestamp = new Date().toISOString(),
  ) {}
}
