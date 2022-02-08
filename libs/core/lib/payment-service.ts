export interface PaymentService {
  cancel(id: string): Promise<void>;
  generateUrl(orderId: string, unitAmount: number): Promise<{ id: string, raw: unknown, url: string }>;
}
