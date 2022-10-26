/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { UserFormsModule } from './user-forms/user-forms.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.x1rk3um.mongodb.net/starbearbase?retryWrites=true&w=majority`,
    ),
    AuthModule,
    UsersModule,
    UserFormsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
