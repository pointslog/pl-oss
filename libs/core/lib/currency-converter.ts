export interface CurrencyConverter {
  fromGweiToUsd(amount: number): Promise<number>;
  fromGweiToEth(amount: number): Promise<number>;
  fromEthToUsd(amount: number): Promise<number>;
  fromUsdToCents(amount: number): Promise<number>;
}
