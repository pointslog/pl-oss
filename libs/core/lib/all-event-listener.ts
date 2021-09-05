import { Event } from './event';
import { EventListener } from './event-listener';
import { EventLog } from './event-log';

export class AllEventListener extends EventListener {
  constructor(private readonly eventLog: EventLog) {
    super();
  }

  getStreamNamePrefixes() {
    return [''];
  }

  async on(event: Event): Promise<void> {
    if (!event.type) return;
    await this.eventLog.log(event);
  }
}
