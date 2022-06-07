import { CurrencyConversionFailedException, CurrencyConverter } from '@pl-oss/core';
import axios from 'axios';

type CoinbaseResponse = { data: { amount: string; }; }

export class CoinbaseCurrencyConverter implements CurrencyConverter {
  private readonly baseUrl = 'https://api.coinbase.com/v2';
  private readonly gweiMultiplier = 1_000_000_000;
  private readonly usdMultiplier = 100;

  async fromGweiToEth(amount: number): Promise<number> {
    return amount / this.gweiMultiplier;
  }

  async fromGweiToUsd(amount: number): Promise<number> {
    if (amount === 0) return 0;
    const response = await axios.get<CoinbaseResponse>(`${this.baseUrl}/prices/ETH-USD/spot`);
    if (response.status !== 200) throw new CurrencyConversionFailedException(amount, 'gwei', 'usd');
    const ethPriceInUsd = parseFloat(response.data.data.amount);
    const amountEth = await this.fromGweiToEth(amount);
    const amountUsd = amountEth * ethPriceInUsd;
    return parseFloat(amountUsd.toFixed(2));
  }

  async fromEthToUsd(amount: number): Promise<number> {
    const response = await axios.get<CoinbaseResponse>(`${this.baseUrl}/prices/ETH-USD/spot`);
    if (response.status !== 200) throw new CurrencyConversionFailedException(amount, 'eth', 'usd');
    return (amount / this.gweiMultiplier) * parseFloat(response.data.data.amount);
  }

  async fromUsdToCents(amount: number): Promise<number> {
    return amount * this.usdMultiplier;
  }
}
