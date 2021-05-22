/* eslint-disable max-classes-per-file */
import { AggregateRepository } from './aggregate-repository';
import { EventStore } from './event-store';
import { TestAggregate, TestEvent } from './aggregate.spec';
import { Event } from './event';

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
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(eventStore: EventStore) {
    super(eventStore);
  }

  // eslint-disable-next-line class-methods-use-this
  getNewInstance(): TestAggregate {
    return new TestAggregate();
  }
}

describe('AggregateRepository', () => {
  let testAggregate: TestAggregate;
  let testAggregateRepository: TestAggregateRepository;
  let testEvent: TestEvent;
  let testEventStore: EventStore;

  beforeEach(() => {
    testEvent = new TestEvent('id');
    testAggregate = new TestAggregate();
    testEventStore = new TestEventStore();
    testAggregateRepository = new TestAggregateRepository(testEventStore);
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe('getById', () => {
    it('should return TestAggregate', async () => {
      const id = 'abc';
      const stream = `TestAggregate-${id}`;
      const testEvents: Event[] = [testEvent];

      jest.spyOn(testAggregateRepository, 'getNewInstance').mockReturnValueOnce(testAggregate);
      jest.spyOn(testEventStore, 'read').mockResolvedValueOnce(testEvents);
      jest.spyOn(testAggregate, 'applyEvent');

      await testAggregateRepository.getById(id);

      expect(testAggregateRepository.getNewInstance).toHaveBeenCalledTimes(1);
      expect(testEventStore.read).toHaveBeenNthCalledWith(1, stream);
      expect(testAggregate.applyEvent).toHaveBeenNthCalledWith(1, testEvent);
    });
  });
});
