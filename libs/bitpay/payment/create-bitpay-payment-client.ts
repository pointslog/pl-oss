import { Client, Env, Tokens } from 'bitpay-sdk';

export function createBitpayClient(
  bitpayMerchantId: string,
  bitpayPrivateKey: string,
  runtime: string,
) {
  Tokens.merchant = bitpayMerchantId;
  return new Client(
    null,
    runtime === 'production' ? Env.Prod : Env.Test,
    bitpayPrivateKey as string,
    Tokens,
  );
}
