import { Module } from '@nestjs/common';
 
 import { FileService } from './file.service';
import { FileController } from './file.controller';
import { MinioClientModule } from 'src/minio/minio.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MinioClientModule,
    MulterModule.register({ limits: { fileSize: 100 * 1024 * 1024 } }),

  ],
  providers: [FileService],
  controllers: [FileController]
})
export class FileModule {}