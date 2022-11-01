/* eslint-disable prettier/prettier */
// этот файл необходим для создания модели в Базе Данных
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserEntity } from 'src/users/user.scheme';
import * as mongoose from 'mongoose';

export type UserFormEntityDocument = UserFormEntity & Document;

@Schema({
  timestamps: true,
})
export class UserFormEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEntity',
    required: true,
    unique: true,
  })
  userId: UserEntity;

  // =========================== Степпер ====================================
  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ default: false })
  isProfileCreated: boolean;

  @Prop({ default: false })
  isFormCreated: boolean;

  @Prop({ default: false })
  isPublished: boolean;

  @Prop({ default: false })
  isDraft: boolean;

  @Prop({ default: 0 })
  viewCounter: number;

  // =========================== Профиль ====================================

  @Prop()
  firstName: string;

  @Prop()
  secondName: string;

  @Prop()
  lastName: string;

  @Prop()
  birthDate: string;

  @Prop()
  country: string;

  @Prop()
  city: string;

  @Prop()
  citizenship: string;

  @Prop()
  gender: string;

  @Prop({
    type: [
      {
        category: { type: String },
        skills: { type: [String] },
        experience: { type: String }
      }
    ]
  })
  skillInformation: { category: string; skills: string[]; experience: string }[];

  @Prop()
  interestedTags: string[];

  @Prop()
  experience: string;

  @Prop()
  aboutDescription: string;
}

export const UserFormScheme = SchemaFactory.createForClass(UserFormEntity);
