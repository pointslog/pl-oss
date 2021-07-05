import { AllStreamSubscription, EventStoreDBClient, streamNameFilter } from '@eventstore/db-client';
import { EventListener } from '@pl-oss/domain';
import { EventStoreDBEventSubscription } from './event-store-db.event-subscription';

class TestEventListener extends EventListener {
  getStreamPrefixes(): string[] { return []; }
}

async function* generateEvents() {
  const events = [
    { data: 'first' },
    { data: 'second' },
  ];
  for (let i = 0; i < events.length; i += 1) yield { event: events[i] };
}

jest.mock('@eventstore/db-client', () => ({
  ...jest.requireActual<Record<string, unknown>>('@eventstore/db-client'),
  EventStoreDBClient: { connectionString: () => ({ subscribeToAll: jest.fn() }) },
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

  afterEach(jest.clearAllMocks);

  describe('register', () => {
    it('should register and call listener.on', async () => {
      const prefixes = testEventListener.getStreamPrefixes();
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
