export class EntityRepositoryException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'EntityRepositoryException';
  }
}
