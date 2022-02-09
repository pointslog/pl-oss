import { GeneratedPayment, PaymentProvider } from '@pl-oss/core';
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
    private readonly appClientUrl: string,
    private readonly appServerUrl: string,
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

  async generatePayment(orderId: string, unitAmount: number): Promise<GeneratedPayment> {
    const invoiceOptions = new Models.Invoice((unitAmount), Currency.USD);
    invoiceOptions.notificationURL = `${this.appServerUrl}/api/webhooks/bitpay`;
    invoiceOptions.orderId = orderId;
    invoiceOptions.redirectURL = `${this.appClientUrl}/wallet-assets`;
    invoiceOptions.extendedNotifications = true;
    const invoiceResponse = await this.client.CreateInvoice(invoiceOptions);
    return { id: invoiceResponse.id, url: invoiceResponse.url, raw: invoiceResponse };
  }
}
