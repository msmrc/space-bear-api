/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { AuthUserDto } from './dto/auth.dto';
import { ErrorConverter } from 'src/common/tools/error-converter';
import { CreateUserRequestDto } from './dto/user.dto';
import { UserFormsService } from 'src/user-forms/user-forms.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private userFormsService: UserFormsService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user: any = await this.usersService.findByEmail(email);
    if (user && (await this.comparePassword(user.passwordHash, pass))) {
      // Вырезаем свойство passwordHash из объекта user
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { $__, $isNew, $init, ...userObject } = user;
      const { passwordHash, ...result } = userObject._doc;
      return result;
    }
    return null;
  }

  async loginAdmin(user: AuthUserDto): Promise<any> {
    try {
      const validatedUser = await this.validateUser(user.email, user.password);
      if (!validatedUser) {
        throw new Error();
      }

      if (validatedUser.role !== 'superAdmin') {
        throw new Error();
      }

      const payload = {
        userId: validatedUser._id.toString(),
        email: user.email,
      };

      const signResult = {
        ...validatedUser,
        access_token: this.jwtService.sign(payload),
      };
      return signResult;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async login(user: AuthUserDto): Promise<any> {
    try {
      const validatedUser = await this.validateUser(user.email, user.password);
      if (!validatedUser) {
        throw new Error();
      }

      const payload = {
        userId: validatedUser._id.toString(),
        email: user.email,
      };

      const signResult = {
        ...validatedUser,
        access_token: this.jwtService.sign(payload),
      };
      return signResult;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async createAdmin(userDto: CreateUserRequestDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();

      const createUser = await this.usersService.createAdmin({
        email: userDto.email,
        password: userDto.password,
        role: 'superAdmin',
      });

      const authedUser = await this.login({
        email: createUser.email,
        password: userDto.password,
      });

      return authedUser;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }


  async create(userDto: CreateUserRequestDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();

      const createUser = await this.usersService.createUser({
        email: userDto.email,
        password: userDto.password,
      });

      const authedUser = await this.login({
        email: createUser.email,
        password: userDto.password,
      });

      return authedUser;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  private async comparePassword(
    passwordHash,
    passwordInputed,
  ): Promise<boolean> {
    return await bcrypt.compare(passwordInputed, passwordHash);
  }
}
