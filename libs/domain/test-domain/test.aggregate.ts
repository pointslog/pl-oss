import { Aggregate } from '../lib/aggregate';
import { TestEvent } from './test.event';

export class TestAggregate extends Aggregate {
  streamNamePrefix = 'TestAggregate'

  raise() {
    this.raiseEvent(new TestEvent(this.id));
  }
}
