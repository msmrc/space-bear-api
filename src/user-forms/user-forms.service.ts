/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorConverter } from 'src/common/tools/error-converter';
import { FillProfileMinimumDTOInterface, FullUserInterface } from './dto/fill-profile-minimum-dto.interface';
import {
  UserFormEntity,
  UserFormEntityDocument,
} from './schemes/user-forms.scheme';


@Injectable()
export class UserFormsService {
  constructor(
    @InjectModel(UserFormEntity.name)
    private userFormModel: Model<UserFormEntityDocument>,
  ) { }

  async create(userDto: FillProfileMinimumDTOInterface): Promise<UserFormEntityDocument> {
    try {
      if (userDto.userId) {
        const existedUser = await this.userFormModel.findOne({
          userId: userDto.userId,
        });

        if (existedUser) {
          const updatedUser = await this.userFormModel
            .findByIdAndUpdate(existedUser._id, userDto)
            .setOptions({ new: true });
          return updatedUser;
        } else {
          const createUser = new this.userFormModel(userDto);
          const createdUser = await createUser.save();
          return createdUser;
        }

      } else {
        throw new Error()
      }
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async getUserList(): Promise<UserFormEntityDocument[]> {
    try {
      const users = await this.userFormModel
        .find({})
        .exec();
      return users;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async getUserByUserId(userId): Promise<UserFormEntityDocument> {
    try {
      const user = await this.userFormModel.findOne({
        userId: userId,
      });

      return user;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

}
