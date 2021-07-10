export interface GraphQLService {
  publish(triggerName: string, payload: unknown): Promise<void>
}
