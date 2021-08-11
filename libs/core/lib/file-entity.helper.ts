import { FileEntity } from './file.entity';
import { InvalidFileExtensionException } from './invalid-file-extension.exception';

const ALLOWED_EXTENSIONS = [
  'gif',
  'jpeg',
  'jpg',
  'mov',
  'mp3',
  'mp4',
  'pdf',
  'png',
];

function isValidExtension(extension: string): boolean {
  return ALLOWED_EXTENSIONS.includes(extension);
}

export class FileEntityHelper {
  constructor(private readonly fileEntity: FileEntity) {}

  get extension(): string {
    const fromFile = this.mimeType.split('/')[1];
    if (isValidExtension(fromFile)) return fromFile;
    const fromId = this.fileEntity.id.split('.').pop().toLowerCase();
    if (isValidExtension(fromId)) return fromId;
    throw new InvalidFileExtensionException();
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
