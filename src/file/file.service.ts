import { Injectable } from '@nestjs/common';
import { MinioClientService } from 'src/minio/minio.service';

@Injectable()
export class FileService {
    constructor(
        private minioClientService: MinioClientService
      ) {}

    async uploadSingle(image) {

        let uploaded_image = await this.minioClientService.upload(image)
    
        return {
          image_url: uploaded_image.url,
          message: "Successfully uploaded to MinIO S3"
        }
      }
}
