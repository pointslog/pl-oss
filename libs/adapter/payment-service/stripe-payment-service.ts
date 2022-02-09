import { Environment, PaymentService } from '@pl-oss/core';
import Stripe from 'stripe';

export class StripePaymentService implements PaymentService {
  private readonly appClientUrl: string;
  private readonly stripe: Stripe;

  constructor(environment: Environment) {
    this.appClientUrl = environment.appClientUrl.toString();
    this.stripe = new Stripe(environment.stripeSecretKey.toString(), { apiVersion: '2020-08-27' });
  }

  async cancel(id: string): Promise<void> {
    await this.stripe.checkout.sessions.expire(id);
  }

  async generatePayment(orderId: string, unitAmount: number): Promise<{ id: string, raw: unknown, url: string }> {
    const priceData = { currency: 'usd', product_data: { name: orderId }, unit_amount: unitAmount };
    const successUrl = `${this.appClientUrl}/stripe-payment?status=success&orderId=${orderId}`;
    const cancelUrl = `${this.appClientUrl}/stripe-payment?status=fail&orderId=${orderId}`;
    const session = await this.stripe.checkout.sessions.create({
      success_url: successUrl,
      cancel_url: cancelUrl,
      payment_method_types: ['card'],
      line_items: [{ price_data: priceData, quantity: 1 }],
      mode: 'payment',
      metadata: { orderId },
    });
    return { id: session.id, raw: session, url: session.url };
  }
}
