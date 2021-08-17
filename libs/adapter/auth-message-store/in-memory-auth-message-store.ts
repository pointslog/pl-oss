import { AuthMessage, AuthMessageStore } from '@pl-oss/core';

export class InMemoryAuthMessageStore implements AuthMessageStore {
  constructor(private authMessage: AuthMessage = {}) {}

  delete(walletAddress: string): void {
    delete this.authMessage[walletAddress];
  }

  getByWalletAddress(walletAddress: string): string {
    return this.authMessage[walletAddress];
  }

  save(walletAddress: string, message: string): void {
    this.authMessage[walletAddress] = message;
  }
}
