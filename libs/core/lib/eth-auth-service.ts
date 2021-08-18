import { recoverPersonalSignature } from 'eth-sig-util';

export abstract class EthAuthService {
  // eslint-disable-next-line class-methods-use-this
  verify(signedMessage: string, unsignedPlainMessage: string, claimedAddress: string): boolean {
    const unsignedMessageHex = Buffer.from(unsignedPlainMessage, 'utf8').toString('hex');
    const unsignedMessage = `0x${unsignedMessageHex}`;
    const recoveredAddress = recoverPersonalSignature({
      data: unsignedMessage,
      sig: signedMessage,
    });
    return recoveredAddress === claimedAddress;
  }

  abstract generateMessage(): string;
}
