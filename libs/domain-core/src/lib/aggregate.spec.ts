/* eslint-disable max-classes-per-file */
import { Aggregate } from './aggregate';
import { EventMetadata } from './event-metadata';
import { Event } from './event';

export class TestEvent implements Event {
  readonly type = 'TestEvent'

  readonly data: {
    readonly id: string
  }

  readonly metadata: EventMetadata

  constructor(id: string) {
    this.data = { id };
    this.metadata = { timestamp: new Date() };
  }
}

export class TestAggregate extends Aggregate {
  // eslint-disable-next-line
  applyTestEvent(testEvent: TestEvent) {}
}

describe('Aggregate', () => {
  let testAggregate: TestAggregate;
  let testEvent: TestEvent;

  beforeEach(() => {
    testAggregate = new TestAggregate();
    testEvent = new TestEvent('id');
  });

  afterEach(jest.clearAllMocks);

  describe('applyEvent', () => {
    it('should call apply{EventName} and increment revision', async () => {
      jest.spyOn(testAggregate, 'applyTestEvent');
      testAggregate.applyEvent(testEvent);
      expect(testAggregate.applyTestEvent).toHaveBeenNthCalledWith(1, testEvent);
      expect(testAggregate.revision).toBe(0);
    });
  });

  describe('raiseEvent', () => {
    it('should call applyEvent and push event to changes', async () => {
      jest.spyOn(testAggregate, 'applyEvent');
      testAggregate.raiseEvent(testEvent);
      expect(testAggregate.applyEvent).toHaveBeenNthCalledWith(1, testEvent);
      expect(testAggregate.changes.length).toBe(1);
    });
  });

  describe('resetChanges', () => {
    it('should reset changes', async () => {
      testAggregate.raiseEvent(testEvent);
      testAggregate.resetChanges();
      expect(testAggregate.changes.length).toBe(0);
    });
  });
});
