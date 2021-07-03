export interface LoggerService {
  log(message: string, payload?: unknown, timestamp?: Date): Promise<void>;
}
