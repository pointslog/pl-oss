export class IdShouldBeUniqueException extends Error {
  constructor() {
    super('exception.id.should-be.unique');
    this.name = 'IdShouldBeUniqueException';
  }
}
