import { TestEventListener } from '../test-domain/test.event-listener';
import { Event } from './event';

describe('EventListener', () => {
  let testEventListener: TestEventListener;

  beforeEach(() => {
    testEventListener = new TestEventListener();
  });

  afterEach(jest.clearAllMocks);

  describe('on', () => {
    it('should route event', async () => {
      jest.spyOn(testEventListener, 'onTestEvent').mockResolvedValue(undefined);

      const event = { type: 'TestEvent' };
      await testEventListener.on(event as Event);

      expect(testEventListener.onTestEvent).toHaveBeenCalledTimes(1);
      expect(testEventListener.onTestEvent).toHaveBeenNthCalledWith(1, event);
    });
  });
});
