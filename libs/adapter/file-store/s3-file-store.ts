import {
  FileEntity, FileEntityHelper, FileStore, UnimplementedException,
} from '@pl-oss/core';
import { S3 } from 'aws-sdk';

export class S3FileStore implements FileStore {
  constructor(
    private readonly s3: S3,
    private readonly bucket: string,
  ) {}

  async append(fileEntity: FileEntity): Promise<void> {
    const params = this.getS3Params(fileEntity);
    await this.s3
      .upload(params)
      .promise();
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  async read(id: string): Promise<FileEntity> {
    throw new UnimplementedException();
  }

  private getS3Params(fileEntity: FileEntity): S3.PutObjectRequest {
    const fileEntityHelper = new FileEntityHelper(fileEntity);
    return {
      ACL: 'public-read',
      Body: Buffer.from(fileEntityHelper.rawData, 'base64'),
      Bucket: this.bucket,
      ContentEncoding: 'base64',
      ContentType: fileEntityHelper.mimeType,
      Key: fileEntity.id,
    };
  }
}
