import { Entity } from '@pl-oss/domain';

export class FileEntity implements Entity {
  constructor(
    readonly id: string,
    readonly data: string,
    readonly timestamp = new Date().toISOString(),
  ) {}
}
