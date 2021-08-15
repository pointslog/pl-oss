export class InvalidFileExtensionException extends Error {
  constructor() {
    super('exception.invalid-file-extension');
    this.name = 'InvalidFileExtensionException';
  }
}
