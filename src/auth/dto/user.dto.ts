/* eslint-disable prettier/prettier */
// создание нового пользователя
export class CreateUserRequestDto {
  readonly email: string;
  readonly password: string;
  readonly firstName?: string;
  readonly secondName?: string;
}

export class CreateUserDto {
  readonly email: string;
  readonly passwordHash: string;
}

export class UserResponseDto {
  _id: string;
  __v: number;
  email: string;
  isEmailVerified: boolean;
  phone: string;
  isRemoved: boolean;
}
