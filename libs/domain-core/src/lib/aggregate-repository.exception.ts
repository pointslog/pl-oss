export class AggregateRepositoryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AggregateRepositoryException';
  }
}
