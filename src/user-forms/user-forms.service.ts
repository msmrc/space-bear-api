/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
}
