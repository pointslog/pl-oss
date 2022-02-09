import { PaymentProvider } from '@pl-oss/core';
import {
  Client, Currency, Env, Models, Tokens,
} from 'bitpay-sdk';

function createBitpayClient(
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

export class BitpayPaymentProvider implements PaymentProvider {
  private readonly client: Client;

  constructor(
    private readonly bitpayMerchantId: string,
    private readonly bitpayPrivateKey: string,
    private readonly runtime: string,
  ) {
    this.client = createBitpayClient(bitpayMerchantId, bitpayPrivateKey, runtime);
  }

  // eslint-disable-next-line class-methods-use-this
  async cancel(_id: string): Promise<void> {
    // implementation is not available
  }

  async generatePayment(orderId: string, unitAmount: number): Promise<{ id: string, raw: unknown, url: string }> {
    const { appClientUrl, appServerUrl } = this.environment;
    const invoiceOptions = new Models.Invoice((unitAmount), Currency.USD);
    invoiceOptions.notificationURL = `${appServerUrl}/api/webhooks/bitpay`;
    invoiceOptions.orderId = orderId;
    invoiceOptions.redirectURL = `${appClientUrl}/wallet-assets`;
    invoiceOptions.extendedNotifications = true;
    const invoiceResponse = await this.client.CreateInvoice(invoiceOptions);
    const { id, url } = invoiceResponse;
    return { id, url, raw: invoiceResponse };
  }
}
