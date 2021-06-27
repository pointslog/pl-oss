import { CommandHandler } from './command-handler';
import { QueryHandler } from './query-handler';

type Handler = CommandHandler | QueryHandler;
export type HandlerMap = Record<string, Handler>;
