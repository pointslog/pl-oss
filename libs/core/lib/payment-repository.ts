export interface PaymentRepository {
  cancel(id: string): Promise<void>;
  generateUrl(orderId: string): Promise<string>;
}
