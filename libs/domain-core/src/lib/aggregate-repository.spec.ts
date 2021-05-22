/* eslint-disable max-classes-per-file */
import { AggregateRepository, EventStore } from '@pl-oss/domain-core';
import { TestAggregate } from './aggregate.spec';

class TestAggregateRepository extends AggregateRepository<TestAggregate> {
  constructor(eventStore: EventStore) {
    super(eventStore);
  }

  getNewInstance(): TestAggregate {
    return new TestAggregate();
  }
}

describe('AggregateRepository', () => {
  describe('test', () => {
    it('test', async () => {
      expect(true).toBeTruthy();
    });
  });
});
