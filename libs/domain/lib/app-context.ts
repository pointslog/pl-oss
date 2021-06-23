import { AggregateRepository } from './aggregate-repository';
import { Aggregate } from './aggregate';
import { EntityRepository } from './entity-repository';
import { Entity } from './entity';

export interface AppContext {
  readonly aggregateRepositoryMap: Record<string, AggregateRepository<Aggregate>>
  readonly entityRepositoryMap: Record<string, EntityRepository<Entity>>
}
