/* eslint-disable max-classes-per-file */
import { AggregateRepository } from './aggregate-repository';
import { Event } from './event';
import { EventStore } from './event-store';
import { TestAggregate, TestEvent } from './aggregate.spec';

class TestEventStore implements EventStore {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  append(stream: string, events: Event[], expectedRevision: number): Promise<void> {
    return Promise.resolve(undefined);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  read(stream: string): Promise<Event[]> {
    return Promise.resolve([]);
  }
}

class TestAggregateRepository extends AggregateRepository<TestAggregate> {
  // eslint-disable-next-line class-methods-use-this
  getNewInstance(): TestAggregate {
    return new TestAggregate();
  }
}

describe('AggregateRepository', () => {
  const id = 'id';
  const stream = `TestAggregate-${id}`;

  let testAggregate: TestAggregate;
  let testAggregateRepository: TestAggregateRepository;
  let testEventStore: EventStore;

  beforeEach(() => {
    testAggregate = new TestAggregate();
    testEventStore = new TestEventStore();
    testAggregateRepository = new TestAggregateRepository(testEventStore);
  });

  afterEach(jest.clearAllMocks);

  describe('getById', () => {
    const testEventFirst = new TestEvent('first');
    const testEventSecond = new TestEvent('second');
    const testEvents = [testEventFirst, testEventSecond];

    it('should return TestAggregate', async () => {
      jest.spyOn(testAggregateRepository, 'getNewInstance').mockReturnValueOnce(testAggregate);
      jest.spyOn(testEventStore, 'read').mockResolvedValueOnce(testEvents);
      jest.spyOn(testAggregate, 'applyEvent');

      const aggregate = await testAggregateRepository.getById(id);

      expect(testAggregateRepository.getNewInstance).toHaveBeenCalledTimes(1);
      expect(testAggregateRepository.getNewInstance).toHaveBeenNthCalledWith(1);

      expect(testEventStore.read).toHaveBeenCalledTimes(1);
      expect(testEventStore.read).toHaveBeenNthCalledWith(1, stream);

      expect(testAggregate.applyEvent).toHaveBeenCalledTimes(2);
      expect(testAggregate.applyEvent).toHaveBeenNthCalledWith(1, testEventFirst);
      expect(testAggregate.applyEvent).toHaveBeenNthCalledWith(2, testEventSecond);
      expect(aggregate.revision).toStrictEqual(1);
    });
  });

  describe('save', () => {
    it('should handle save with raiseEvent call', async () => {
      testAggregate.id = id;
      const testEvent = new TestEvent('id');

      jest.spyOn(testEventStore, 'append');
      jest.spyOn(testAggregate, 'resetChanges');

      testAggregate.raiseEvent(testEvent);
      await testAggregateRepository.save(testAggregate);

      expect(testAggregate.resetChanges).toHaveBeenCalledTimes(1);
      expect(testAggregate.resetChanges).toHaveBeenNthCalledWith(1);

      expect(testEventStore.append).toHaveBeenCalledTimes(1);
      expect(testEventStore.append).toHaveBeenNthCalledWith(1, stream, [testEvent], -1);
    });
  });
});
