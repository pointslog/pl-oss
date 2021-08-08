export interface LoggingService {
  log(message: string, payload?: unknown, timestamp?: Date): Promise<void>;
}
