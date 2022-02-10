export class ItemDoesNotExistException extends Error {
  constructor(readonly itemId: string) {
    super('exception.item-does-not-exist');
    this.name = 'ItemDoesNotExistException';
  }
}
