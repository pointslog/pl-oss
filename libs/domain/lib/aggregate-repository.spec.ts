import { mock } from 'jest-mock-extended';
import { TestAggregateRepository, TestAggregate, TestEvent } from '../test-domain';
import { EventStore } from './event-store';

describe('AggregateRepository', () => {
  const id = 'id';
  const stream = `TestAggregate-${id}`;

  let testAggregate: TestAggregate;
  let testAggregateRepository: TestAggregateRepository;
  let eventStore: EventStore;

  beforeEach(() => {
    testAggregate = new TestAggregate();
    eventStore = mock<EventStore>();
    testAggregateRepository = new TestAggregateRepository(eventStore);
  });

  afterEach(jest.clearAllMocks);

  describe('getById', () => {
    const testEventFirst = new TestEvent('first');
    const testEventSecond = new TestEvent('second');
    const testEvents = [testEventFirst, testEventSecond];

    it('should return TestAggregate', async () => {
      jest.spyOn(testAggregateRepository, 'getNewInstance').mockReturnValueOnce(testAggregate);
      jest.spyOn(eventStore, 'read').mockResolvedValueOnce(testEvents);
      jest.spyOn(testAggregate, 'applyEvent');

      const aggregate = await testAggregateRepository.getById(id);

      expect(testAggregateRepository.getNewInstance).toHaveBeenCalledTimes(1);
      expect(testAggregateRepository.getNewInstance).toHaveBeenNthCalledWith(1);

      expect(eventStore.read).toHaveBeenCalledTimes(1);
      expect(eventStore.read).toHaveBeenNthCalledWith(1, stream);

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

      jest.spyOn(eventStore, 'append');
      jest.spyOn(testAggregate, 'resetChanges');

      testAggregate.raiseEvent(testEvent);
      await testAggregateRepository.save(testAggregate);

      expect(testAggregate.resetChanges).toHaveBeenCalledTimes(1);
      expect(testAggregate.resetChanges).toHaveBeenNthCalledWith(1);

      expect(eventStore.append).toHaveBeenCalledTimes(1);
      expect(eventStore.append).toHaveBeenNthCalledWith(1, stream, [testEvent], -1);
    });
  });
});
