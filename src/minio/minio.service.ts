import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { Stream } from 'stream';
import * as crypto from 'crypto'
import { BufferedFile } from './interfaces';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'nestjs-minio-client';

@Injectable()
export class MinioClientService {

    constructor(
        private readonly minio: MinioService,
        private readonly configService: ConfigService
    ) {
        this.logger = new Logger('MinioStorageService');
    }


    private readonly logger: Logger;
    private readonly baseBucket = this.configService.get("MINIO_BUCKET")

    public get client() {
        return this.minio.client;
    }


    public async upload(file: BufferedFile, baseBucket: string = this.baseBucket) {
        if (!(file.mimetype.includes('jpeg') || file.mimetype.includes('png'))) {
            throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
        }
        let temp_filename = Date.now().toString()
        let hashedFileName = crypto.createHash('md5').update(temp_filename).digest("hex");
        let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
        const metaData = {
            'Content-Type': file.mimetype,
            'X-Amz-Meta-Testing': 1234,
        };
        let filename = hashedFileName + ext
        const fileName: string = `${filename}`;
        const fileBuffer = file.buffer;
        await this.client.putObject(baseBucket, fileName, fileBuffer, 2323, function (err, res) {
            console.log(err)
            console.log(res)
            if (err) throw new HttpException('Error uploading file', HttpStatus.BAD_REQUEST)
        })

        return {
            url: `${this.configService.get("MINIO_ENDPOINT")}:${this.configService.get("MINIO_PORT")}/${this.configService.get("MINIO_BUCKET")}/${filename}`
        }
    }

    async delete(objetName: string, baseBucket: string = this.baseBucket) {
        this.client.removeObjects(baseBucket, [objetName],  () => {

        }) 
    }
}