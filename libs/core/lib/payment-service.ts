type PaymentGenerated = {
  id: string;
  raw: unknown;
  url: string;
}

export interface PaymentService {
  cancel(id: string): Promise<void>;
  generatePayment(orderId: string, unitAmount: number): Promise<PaymentGenerated>;
}
