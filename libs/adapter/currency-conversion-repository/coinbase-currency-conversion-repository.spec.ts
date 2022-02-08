import axios from 'axios';
import { CoinbaseCurrencyConversionRepository } from './coinbase-currency-conversion-repository';

jest.mock('axios');

describe('CoinbaseCurrencyConversionRepository', () => {
  let mockedAxios;
  let repository: CoinbaseCurrencyConversionRepository;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    repository = new CoinbaseCurrencyConversionRepository();
  });

  describe('fromEthToUsd', () => {
    it('should call fromEthToUsd', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { data: { amount: 2500 } } });

      const result = await repository.fromEthToUsd(1);
      expect(result).toStrictEqual(0.0000025);
    });

    it('should throw CurrencyConversionFailedException', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 401 });

      let error;
      try {
        await repository.fromEthToUsd(1);
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe('exception.currency-conversion-failed');
      expect(error.amount).toBe(1);
      expect(error.from).toBe('eth');
      expect(error.to).toBe('usd');
    });
  });

  describe('fromUsdToCents', () => {
    it('should call fromUsdToCents', () => {
      expect(repository.fromUsdToCents(1)).toStrictEqual(100);
    });
  });
});
