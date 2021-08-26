import axios from 'axios';

export class EthGraphQLAuthService {
  constructor(private readonly url: string) {}

  async getHexMessage(address: string): Promise<string> {
    const query = `mutation{ generateAuthMessage(walletAddress: "${address}") }`;
    const { data } = await axios({
      url: this.url,
      method: 'post',
      data: { query },
    });
    const unsignedMessageBuffer = Buffer.from(data.data.generateAuthMessage, 'utf8');
    return `0x${unsignedMessageBuffer.toString('hex')}`;
  }

  async getAccessToken(signedMessage: string, walletAddress: string): Promise<string> {
    const query = `mutation{ generateAccessToken(signedMessage: "${signedMessage}", walletAddress: "${walletAddress}")}`;

    const { data } = await axios({
      url: this.url,
      method: 'post',
      data: { query },
    });
    return data.data.generateAccessToken;
  }
}
