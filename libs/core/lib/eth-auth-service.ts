import { recoverPersonalSignature } from 'eth-sig-util';
import { v4 as uuid } from 'uuid';

export class EthAuthService {
  generateMessage(): string {
    const id = uuid();
    return `Please sign this transaction to prove the authenticity of your request. Nonce: ${id}`;
  }

  // eslint-disable-next-line class-methods-use-this
  recoverWalletId(signedMessage: string, unsignedMessage: string): string {
    const data = `0x${Buffer.from(unsignedMessage, 'utf8').toString('hex')}`;
    return recoverPersonalSignature({ data, sig: signedMessage });
  }
}
