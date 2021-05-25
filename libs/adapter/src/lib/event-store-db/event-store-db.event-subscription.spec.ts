import { AllStreamSubscription, EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { EventListener, Event } from '@pl-oss/domain-core';
import { EventStoreDBEventSubscription } from './event-store-db.event-subscription';

class TestEventListener implements EventListener {
  eventTypePrefixes: string[];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars,class-methods-use-this
  on(event: Event): Promise<void> {
    return Promise.resolve(undefined);
  }
}

async function* generateEvents() {
  const events = ['first', 'second'];
  for (let i = 0; i < events.length; i += 1) yield { event: events[i] };
}

jest.mock('@eventstore/db-client', () => ({
  ...(jest.requireActual('@eventstore/db-client')),
  EventStoreDBClient: { connectionString: () => ({ subscribeToAll: () => ({}) }) },
}));

describe('EventStoreDBEventSubscription', () => {
  let testEventListener: TestEventListener;
  let testEventStoreDBClient: EventStoreDBClient;
  let testEventStoreDBEventSubscription: EventStoreDBEventSubscription;

  beforeEach(() => {
    testEventListener = new TestEventListener();
    testEventStoreDBClient = EventStoreDBClient.connectionString('');
    testEventStoreDBEventSubscription = new EventStoreDBEventSubscription(testEventStoreDBClient);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('register', () => {
    it('should register and call listener.on', async () => {
      const prefixes = testEventListener.eventTypePrefixes;
      const filter = streamNameFilter({ prefixes });
      const events = generateEvents();

      jest.spyOn(testEventListener, 'on').mockResolvedValue(undefined);
      jest.spyOn(testEventStoreDBClient, 'subscribeToAll').mockReturnValue(events as unknown as AllStreamSubscription);

      await testEventStoreDBEventSubscription.register(testEventListener);

      expect(testEventStoreDBClient.subscribeToAll).toHaveBeenCalledTimes(1);
      expect(testEventStoreDBClient.subscribeToAll).toHaveBeenNthCalledWith(1, { filter });
      expect(testEventListener.on).toHaveBeenCalledTimes(2);
      expect(testEventListener.on).toHaveBeenNthCalledWith(1, 'first');
      expect(testEventListener.on).toHaveBeenNthCalledWith(2, 'second');
    });
  });
});
