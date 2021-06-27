import { Query } from './query';

export interface QueryHandler<T extends Query = Query> {
  handle(query: T): Promise<unknown>
}
