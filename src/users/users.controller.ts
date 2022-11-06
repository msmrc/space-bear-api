/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserEntity } from './user.scheme';
import { UsersService } from './users.service';

@Controller('api/user-profiles')
export class UsersController {
  private readonly logger = new Logger(UsersController.name);

  constructor(private userService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-list')
  getUserList(): Promise<UserEntity[]> {
    return this.userService.getUserList();
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-by-id/:id')
  getById() {
    // TODO:  return req.user;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: UserEntity): any {
    this.logger.log('Handling update() request with id=' + id + '...');
    // TODO:    return this.userService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string): any {
    this.logger.log('Handling remove() request with id=' + id + '...');
    // TODO:    return this.userService.remove(id);
  }

  // FOR ML TESTS
  @Get('ml-get-all')
  mlGetAll(): any {
    return this.userService.mlGetAll();
  }

  @Get('ml-get-by-id/:id')
  mlGetById(@Param('id') id: string): any {
    return this.userService.mlGetById(id);
  }


  // @Get('remove-all-3')
  // removeAll(): any {
  //   return this.userService.removeAll();
  // }
}
