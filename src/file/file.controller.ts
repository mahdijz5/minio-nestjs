import { Controller, Post, UseInterceptors, UploadedFile, Req, ParseFilePipe, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'
import { FileService } from './file.service';
import { BufferedFile } from 'src/minio/interfaces';
import { ApiConsumes } from '@nestjs/swagger';
import { UploadFileDto } from './dto/create-ipfs.dto';

@Controller('file')
export class FileController {
  constructor(
    private fileService: FileService
  ) {}

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(new ParseFilePipe())
    file: Express.Multer.File,
    @Body() createIpfs: UploadFileDto,
  ) {
    console.log(createIpfs)
    console.log(file)
    return await this.fileService.uploadSingle(file);
  }
}