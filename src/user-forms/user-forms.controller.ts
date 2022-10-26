/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserFormsService } from './user-forms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as EasyYandexS3 from 'easy-yandex-s3';

@Controller('api/user-forms')
export class UserFormsController {
  private readonly logger = new Logger(UserFormsController.name);

  constructor(private userService: UserFormsService) { }

  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: any): Promise<any> {
    console.log(file);
    const s3 = new EasyYandexS3({
      auth: {
        accessKeyId: "TODO:",
        secretAccessKey: "TODO:",
      },
      Bucket: "spacebear", // Название бакета
      debug: false // Дебаг в консоли
    });

    const buffer = file.buffer; // Буфер загруженного файла
    const upload = await s3.Upload({ buffer }, '/avatars/'); // Загрузка в бакет

    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return upload;
  }

  @Get(':imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './avatars' });
  }
}
