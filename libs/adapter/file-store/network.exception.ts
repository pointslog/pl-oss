export class NetworkException extends Error {
  constructor() {
    super('network');
    this.name = 'NetworkException';
  }
}
