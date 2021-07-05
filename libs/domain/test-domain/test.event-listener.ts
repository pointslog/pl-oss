import { EventListener } from '../lib/event-listener';

export class TestEventListener extends EventListener {
  getEventTypePrefixes(): string[] { return []; }

  // eslint-disable-next-line class-methods-use-this
  async onTestEvent(): Promise<void> {
    return Promise.resolve();
  }
}
