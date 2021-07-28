export class UnimplementedException extends Error {
  constructor() {
    super('unimplemented');
    this.name = 'UnimplementedException';
  }
}
