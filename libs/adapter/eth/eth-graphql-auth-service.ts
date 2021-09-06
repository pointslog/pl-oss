import axios from 'axios';

export class EthGraphQLAuthService {
  constructor(private readonly url: string) {}

  async getHexMessage(address: string): Promise<string> {
    const query = `mutation { generateAuthMessage(walletId: "${address}") }`;
    const response = await axios.post(this.url, { query });
    const unsignedMessageBuffer = Buffer.from(response.data.data.generateAuthMessage, 'utf8');
    return `0x${unsignedMessageBuffer.toString('hex')}`;
  }

  async getAccessToken(signedMessage: string, walletId: string): Promise<string> {
    const query = `mutation { generateAccessToken(signedMessage: "${signedMessage}" walletId: "${walletId}")}`;
    const response = await axios.post(this.url, { query });
    return response.data.data.generateAccessToken;
  }
}
