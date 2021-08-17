export type AuthMessage = Record<string, string>;

export interface AuthMessageStore {
  delete(walletAddress: string): void
  getByWalletAddress(walletAddress: string): string
  save(walletAddress: string, message: string): void
}
