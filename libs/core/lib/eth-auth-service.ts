import { recoverPersonalSignature } from 'eth-sig-util';

export abstract class EthAuthService {
  abstract generateMessage(): string;

  // eslint-disable-next-line class-methods-use-this
  recoverWalletId(signedMessage: string, unsignedMessage: string): string {
    const data = `0x${Buffer.from(unsignedMessage, 'utf8').toString('hex')}`;
    return recoverPersonalSignature({ data, sig: signedMessage });
  }
}
