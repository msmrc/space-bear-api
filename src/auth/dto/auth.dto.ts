/* eslint-disable prettier/prettier */

import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

// логин
export class AuthUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
