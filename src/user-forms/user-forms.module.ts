/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserFormsController } from './user-forms.controller';
import { UserFormScheme, UserFormEntity } from './schemes/user-forms.scheme';
import { UserFormsService } from './user-forms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserFormEntity.name, schema: UserFormScheme },
    ]),
  ],
  providers: [UserFormsService],
  exports: [UserFormsService],
  controllers: [UserFormsController],
})
export class UserFormsModule { }
