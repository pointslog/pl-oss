export class CommandHandlerException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'CommandHandlerException';
  }
}
