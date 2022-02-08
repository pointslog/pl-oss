export interface CurrencyConverter {
  fromEthToUsd(amount: number): Promise<number>;
  fromUsdToCents(amount: number): number;
}
