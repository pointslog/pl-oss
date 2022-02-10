export class InvalidItemQuantityException extends Error {
  constructor(readonly itemId: string, readonly quantity: number) {
    super('exception.invalid-item-quantity-exception');
    this.name = 'InvalidItemQuantityException';
  }
}
