export class IdShouldBeUniqueException extends Error {
  constructor() {
    super('id.should-be.unique');
    this.name = 'IdShouldBeUniqueException';
  }
}
