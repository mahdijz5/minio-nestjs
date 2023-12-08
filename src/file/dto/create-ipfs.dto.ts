import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Length } from 'class-validator';

export class UploadFileDto {
  // @ApiProperty()
  // @IsString()
  // userId: string;
  
  @ApiProperty({
    type:'string',
    example:'test description'
  })
  @IsString()
  @Length(4, 200)
  description: string;

  // @ApiProperty()
  // @IsString()
  // @Length(4, 100)
  // metadata: string;

  @ApiProperty({ type: 'file', format: 'binary' })
  file: any;
}
