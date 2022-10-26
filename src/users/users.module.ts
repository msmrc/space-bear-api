/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserScheme, UserEntity } from './user.scheme';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserScheme }]),
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule { }
