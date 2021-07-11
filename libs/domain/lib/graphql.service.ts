export interface GraphQLService {
  publish(triggerName: string, payload: unknown): Promise<void>
  asyncIterator<T>(triggers: string | string[]): AsyncIterator<T>
}
