/* eslint-disable prettier/prettier */;
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { AuthUserDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { CreateUserRequestDto } from './dto/user.dto';

@Controller('api/auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() authUser: AuthUserDto): Promise<any> {
    this.logger.log('Handling login() request...');
    return this.authService.login(authUser);
  }

  @Post('create')
  create(@Body() user: CreateUserRequestDto): Promise<any> {
    this.logger.log('Handling create() request...');
    return this.authService.create(user);
  }
}
