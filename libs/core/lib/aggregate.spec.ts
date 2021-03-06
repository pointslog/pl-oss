import { mock } from 'jest-mock-extended';
import { TestAggregate, TestEvent } from '../test-core';
import { EventStore } from './event-store';

describe('Aggregate', () => {
  let eventStore: EventStore;
  let aggregate: TestAggregate;

  beforeEach(() => {
    eventStore = mock<EventStore>();
    aggregate = new TestAggregate('id');
  });

  afterEach(jest.clearAllMocks);

  describe('commit', () => {
    it('should commit aggregate', async () => {
      jest.spyOn(eventStore, 'append').mockResolvedValueOnce();

      aggregate.raise('by', 'timestamp');
      const result = await aggregate.commit(eventStore);

      expect(result).toStrictEqual(aggregate);

      expect(eventStore.append).toHaveBeenCalledTimes(1);
      expect(eventStore.append).toHaveBeenNthCalledWith(1, 'TestAggregate-id', [new TestEvent('id', 'by', 'timestamp')], -1);
    });
  });

  describe('load', () => {
    it('should load aggregate', async () => {
      const events = [new TestEvent('id', 'by', 'timestamp'), new TestEvent('id', 'by', 'timestamp')];
      jest.spyOn(eventStore, 'read').mockResolvedValueOnce(events);

      const result = await aggregate.load(eventStore);

      expect(result).toStrictEqual(aggregate);

      expect(eventStore.read).toHaveBeenCalledTimes(1);
      expect(eventStore.read).toHaveBeenNthCalledWith(1, 'TestAggregate-id');

      expect(aggregate.revision).toStrictEqual(1);
    });
  });
});
