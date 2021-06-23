import { CommandHandler } from './command-handler';
import { Command } from './command';
import { QueryHandler } from './query-handler';
import { Query } from './query';

export interface DomainContext {
  readonly commandHandlerMap: Record<string, CommandHandler<Command>>
  readonly queryHandlerMap: Record<string, QueryHandler<Query>>
}
