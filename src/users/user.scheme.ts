/* eslint-disable prettier/prettier */
// этот файл необходим для создания модели в Базе Данных
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserEntityDocument = UserEntity & Document;

@Schema({
  timestamps: true,
})
export class UserEntity {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: 'user' })
  role: string;

  @Prop({ default: false })
  isEmailVerified: boolean;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ default: false })
  isRemoved: boolean;
}

export const UserScheme = SchemaFactory.createForClass(UserEntity);
