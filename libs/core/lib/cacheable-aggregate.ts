import { Aggregate } from './aggregate';
import { EventStore } from './event-store';

export abstract class CacheableAggregate extends Aggregate {
  // eslint-disable-next-line no-use-before-define
  private static cache: Record<string, CacheableAggregate> = {};

  async commit(eventStore: EventStore): Promise<this> {
    try {
      const result = await super.commit(eventStore);
      return result;
    } catch (e) {
      delete CacheableAggregate.cache[this.id];
      throw (e);
    }
  }

  async load(eventStore: EventStore, skipCache = false): Promise<this> {
    const cached = CacheableAggregate.cache[this.id];
    if (!skipCache && cached) return cached as this;

    const result = await super.load(eventStore);
    CacheableAggregate.cache[this.id] = result;
    return result;
  }
}
