import { Aggregate } from '../lib/aggregate';
import { TestEvent } from './test.event';

export class TestAggregate extends Aggregate {
  readonly streamNamePrefix = 'TestAggregate';

  raise(by: string, timestamp: string) {
    this.raiseEvent(new TestEvent(this.id, by, timestamp));
  }
}
