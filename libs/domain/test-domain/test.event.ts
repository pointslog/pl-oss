import { SYSTEM } from '../lib/constant';
import { Event } from '../lib/event';

export class TestEvent implements Event {
  readonly type = 'TestEvent'

  constructor(
    readonly id: string,
    readonly by = SYSTEM,
    readonly timestamp = new Date(),
  ) {}
}
