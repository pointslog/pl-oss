import { mock } from 'jest-mock-extended';
import { TestAggregate, TestEvent } from '../test-domain';
import { EventStore } from './event-store';

describe('Aggregate', () => {
  let eventStore: EventStore;
  let aggregate: TestAggregate;

  beforeEach(() => {
    eventStore = mock<EventStore>();
    aggregate = new TestAggregate('id');

    jest.useFakeTimers();
    jest.setSystemTime(new Date());
  });

  afterEach(jest.clearAllMocks);

  describe('commit', () => {
    it('should commit aggregate', async () => {
      jest.spyOn(eventStore, 'append').mockResolvedValueOnce();

      aggregate.raise();
      await aggregate.commit(eventStore);

      expect(eventStore.append).toHaveBeenCalledTimes(1);
      expect(eventStore.append).toHaveBeenNthCalledWith(1, 'TestAggregate-id', [new TestEvent('id')], -1);
    });
  });

  describe('load', () => {
    it('should load aggregate', async () => {
      const events = [new TestEvent('id'), new TestEvent('id')];
      jest.spyOn(eventStore, 'read').mockResolvedValueOnce(events);

      await aggregate.load(eventStore);

      expect(eventStore.read).toHaveBeenCalledTimes(1);
      expect(eventStore.read).toHaveBeenNthCalledWith(1, 'TestAggregate-id');

      expect(aggregate.revision).toStrictEqual(1);
    });
  });
});
