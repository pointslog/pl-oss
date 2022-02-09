export class CurrencyConversionFailedException extends Error {
  constructor(readonly amount: number, readonly from: string, readonly to: string) {
    super('exception.currency-conversion-failed');
    this.name = 'CurrencyConversionFailedException';
  }
}
