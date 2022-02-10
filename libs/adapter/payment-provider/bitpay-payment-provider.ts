import { GeneratedPayment, PaymentProvider } from '@pl-oss/core';
import { Client, Currency, Models } from 'bitpay-sdk';
import { createBitpayClient } from './create-bitpay-payment-client';

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
