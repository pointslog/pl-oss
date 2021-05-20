import { Aggregate } from './aggregate';
import { EventStore } from './event-store';

export abstract class AggregateRepository<T extends Aggregate> {
  abstract getNewInstance(): T

  constructor(private readonly eventStore: EventStore) {}

  async getById(id: string): Promise<T> {
    const aggregate = this.getNewInstance();
    const stream = `${aggregate.constructor.name}-${id}`;
    const events = await this.eventStore.read(stream);
    events.forEach((event) => { aggregate.applyEvent(event); });
    return aggregate;
  }

  async save(aggregate: T): Promise<void> {
    const stream = `${aggregate.constructor.name}-${aggregate.id}`;
    const expectedRevision = aggregate.revision - aggregate.changes.length;
    await this.eventStore.append(stream, aggregate.changes, expectedRevision);
    aggregate.resetChanges();
  }
}
