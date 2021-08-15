export class UnimplementedException extends Error {
  constructor() {
    super('exception.unimplemented');
    this.name = 'UnimplementedException';
  }
}
