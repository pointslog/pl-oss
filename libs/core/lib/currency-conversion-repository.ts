export interface CurrencyConversionRepository {
  fromEthToUsd(amount: number): Promise<number>;
  fromUsdToCents(amount: number): number;
}
