import { Environment, PaymentService } from '@pl-oss/core';
import { Client, Currency, Models } from 'bitpay-sdk';

export class BitpayPaymentService implements PaymentService {
  constructor(
    private readonly environment: Environment,
    private readonly client: Client,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  async cancel(_id: string): Promise<void> {
    // implementation is not available
  }

  async generateUrl(orderId: string, unitAmount: number): Promise<{ id: string, raw: unknown, url: string }> {
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
