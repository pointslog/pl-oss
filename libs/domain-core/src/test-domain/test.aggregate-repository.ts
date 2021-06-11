import { AggregateRepository } from '../lib/aggregate-repository';
import { TestAggregate } from './test.aggregate';

export class TestAggregateRepository extends AggregateRepository<TestAggregate> {
  // eslint-disable-next-line class-methods-use-this
  getNewInstance(): TestAggregate {
    return new TestAggregate();
  }
}
