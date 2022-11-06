/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UserFormsService } from './user-forms.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as EasyYandexS3 from 'easy-yandex-s3';
import { FillProfileMinimumDTOInterface } from './dto/fill-profile-minimum-dto.interface';
import { UserFormEntityDocument } from './schemes/user-forms.scheme';

@Controller('api/users')
export class UserFormsController {
  private readonly logger = new Logger(UserFormsController.name);

  constructor(private userService: UserFormsService) { }


  @Get('removeeee-all-2')
  removeAll(): any {
    return this.userService.removeAll();
  }

  @Get('get-all-users')
  getUserList() {
    this.logger.log('Handling getUserList() request...');
    return this.userService.getUserList();
  }

  @Post('create')
  create(@Body() user: FillProfileMinimumDTOInterface): Promise<any> {
    this.logger.log('Handling create() request...');
    return this.userService.create(user);
  }



  @Get('get-user-by-id/:id')
  getUserById(@Param('id') id: string): Promise<UserFormEntityDocument> {
    this.logger.log('Handling getUserByUserId() request...');
    return this.userService.getUserByUserId(id);
  }

  @Get('get-user-by-profile-id/:id')
  getUserByProfileId(@Param('id') id: string): Promise<UserFormEntityDocument> {
    this.logger.log('Handling getUserByProfileId() request...');
    return this.userService.getUserByProfileId(id);
  }


  // ML START

  @Get('ml-get-all-users')
  getMLUserList() {
    this.logger.log('Handling getMLUserList() request...');
    return this.userService.getMLUserList();
  }

  @Get('ml-get-user-by-id/:id')
  getMLUserById(@Param('id') id: string): Promise<UserFormEntityDocument> {
    this.logger.log('Handling getMLUserById() request...');
    return this.userService.getMLUserById(id);
  }

  // ML END


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
