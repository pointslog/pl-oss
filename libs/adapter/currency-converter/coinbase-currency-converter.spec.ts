import axios from 'axios';
import { CoinbaseCurrencyConverter } from './coinbase-currency-converter';

jest.mock('axios');

describe('CoinbaseCurrencyConverter', () => {
  let mockedAxios;
  let converter: CoinbaseCurrencyConverter;

  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
    converter = new CoinbaseCurrencyConverter();
  });

  describe('fromGweiToEth', () => {
    it('should call fromGweiToEth', async () => {
      const result = await converter.fromGweiToEth(1000000000);
      expect(result).toStrictEqual(1);
    });
  });

  describe('fromGweiToUsd', () => {
    it('should call fromGweiToUsd', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { data: { amount: 2500 } } });

      const result = await converter.fromGweiToUsd(1000000000);
      expect(result).toStrictEqual(2500);
    });

    it('should throw CurrencyConversionFailedException', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 401 });

      let error;
      try {
        await converter.fromGweiToUsd(1);
      } catch (e) {
        error = e;
      }

      expect(error.message).toBe('exception.currency-conversion-failed');
      expect(error.amount).toBe(1);
      expect(error.from).toBe('gwei');
      expect(error.to).toBe('usd');
    });
  });

  describe('fromEthToUsd', () => {
    it('should call fromEthToUsd', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 200, data: { data: { amount: 2500 } } });

      const result = await converter.fromEthToUsd(1);
      expect(result).toStrictEqual(0.0000025);
    });

    it('should throw CurrencyConversionFailedException', async () => {
      mockedAxios.get.mockResolvedValueOnce({ status: 401 });

      let error;
      try {
        await converter.fromEthToUsd(1);
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
    it('should call fromUsdToCents', async () => {
      const result = await converter.fromUsdToCents(10);
      expect(result).toStrictEqual(1000);
    });
  });
});
