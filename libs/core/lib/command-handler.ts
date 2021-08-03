import { Command } from './command';

export interface CommandHandler<T extends Command = Command> {
  handle(command: T): Promise<void>;
}
