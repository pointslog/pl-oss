import { CurrencyConversionFailedException, CurrencyConversionRepository } from '@pl-oss/core';
import axios from 'axios';

export class CoinbaseCurrencyConversionRepository implements CurrencyConversionRepository {
  private readonly baseUrl = 'https://api.coinbase.com/v2';
  private readonly unitCents = 100;

  async fromEthToUsd(amount: number): Promise<number> {
    const response = await axios.get<{ data: { amount: string } }>(`${this.baseUrl}/prices/ETH-USD/spot`);
    if (response.status !== 200) throw new CurrencyConversionFailedException(amount, 'eth', 'usd');
    return (amount / 1_000_000_000) * Number.parseFloat(response.data.data.amount);
  }

  fromUsdToCents(amount: number): number {
    return amount * this.unitCents;
  }
}
