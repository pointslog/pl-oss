import { AggregateRepository } from '../lib/aggregate-repository';
import { TestAggregate } from './test.aggregate';

export class TestAggregateRepository extends AggregateRepository<TestAggregate> {
  getNewInstance(): TestAggregate { return new TestAggregate(); }
}
