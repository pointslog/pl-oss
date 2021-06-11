/* eslint-disable max-classes-per-file */
import { EventListener } from './event-listener';
import { Event } from './event';

class TestEventListener extends EventListener {
  // eslint-disable-next-line class-methods-use-this
  getEventTypePrefixes(): string[] {
    return [];
  }

  // eslint-disable-next-line class-methods-use-this
  async onTestEvent(): Promise<void> {
    return Promise.resolve();
  }
}

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
