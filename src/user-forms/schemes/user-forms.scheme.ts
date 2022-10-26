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

  @Prop({ default: false })
  isPromoted: boolean;

  // =========================== Профиль ====================================
  // Base section
  @Prop()
  avatar: string;

  @Prop()
  firstName: string;

  @Prop()
  secondName: string;

  // TODO: Add constants (male, female etc)
  @Prop()
  profileGender: string;

  @Prop()
  profileDateBirthday: Date;

  @Prop({ default: 0 })
  viewCounter: number;

  @Prop({ default: 0 })
  contactsGetCounter: number;

  @Prop()
  profileBasicDescription: string;

  @Prop()
  profileExpiriense: string;

  @Prop()
  professionalDescription: string;

  @Prop()
  professionalLink: string;

  @Prop()
  professionalLinkName: string;

  // =========================== Анкета ====================================

  // Looking for (что ищет) (знакомства/стартап/хакатон)
  // TODO: add constants (ENUM)
  @Prop()
  lookingCategory: string[];

  @Prop()
  lookingDescription: string;


  // TODO: add constants (ENUM) Junior, intern, senior, middle
  @Prop()
  lookingExpiriense: string[];

  // Ссылка на контакт пользователя
  @Prop()
  readonly contactLink: string;
  // Описание Контакта пользователя (это телеграм, почта или что-то другое)
  @Prop()
  readonly contactLinkDescription: string;
}

export const UserFormScheme = SchemaFactory.createForClass(UserFormEntity);
