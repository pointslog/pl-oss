export type GeneratedPayment = {
  id: string;
  raw: unknown;
  url: string;
}

export interface PaymentProvider {
  cancel(id: string): Promise<void>;
  generatePayment(orderId: string, unitAmount: number): Promise<GeneratedPayment>;
  isPaid(id: string): Promise<boolean>;
}
