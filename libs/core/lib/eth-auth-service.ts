import { recoverPersonalSignature } from 'eth-sig-util';

export abstract class EthAuthService {
  abstract generateMessage(): string;

  // eslint-disable-next-line class-methods-use-this
  recoverWalletAddress(signedMessage: string, unsignedMessage: string): string {
    const unsignedMessageBuffer = Buffer.from(unsignedMessage, 'utf8');
    const data = `0x${unsignedMessageBuffer.toString('hex')}`;
    return recoverPersonalSignature({ data, sig: signedMessage });
  }
}
