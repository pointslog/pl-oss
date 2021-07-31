import { FileEntity } from './file.entity';

export class FileEntityHelper {
  constructor(private readonly fileEntity: FileEntity) {}

  get extension(): string {
    return this.mimeType.split('/')[1];
  }

  get mimeType(): string {
    return this.fileEntity.data
      .split(';')[0]
      .split(':')[1];
  }

  get rawData(): string {
    return this.fileEntity.data.split(',')[1];
  }
}
