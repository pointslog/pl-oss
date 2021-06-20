import { CommandHandler } from './command-handler';
import { Command } from './command';
import { EntityRepository } from './entity-repository';
import { Entity } from './entity';
import { QueryHandler } from './query-handler';
import { Query } from './query';
import { AggregateRepository } from './aggregate-repository';
import { Aggregate } from './aggregate';

export interface DomainContext {
  readonly aggregateRepositoryMap: Record<string, AggregateRepository<Aggregate>>
  readonly commandHandlerMap: Record<string, CommandHandler<Command>>
  readonly entityRepositoryMap: Record<string, EntityRepository<Entity>>
  readonly queryHandlerMap: Record<string, QueryHandler<Query>>
}
