export class FileEntity {
  constructor(
    readonly id: string,
    readonly data: string,
    readonly timestamp = new Date().toISOString(),
  ) {}
}
