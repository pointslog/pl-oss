export interface PaymentService {
  cancel(id: string): Promise<void>;
  generateUrl(orderId: string): Promise<string>;
}
