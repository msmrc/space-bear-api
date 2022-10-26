/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserEntity, UserScheme } from 'src/users/user.scheme';
import { UsersModule } from 'src/users/users.module';
import { UserFormsModule } from 'src/user-forms/user-forms.module';

@Module({
  imports: [
    UsersModule,
    UserFormsModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async () => ({
        secretOrPrivateKey: process.env.JWT_SECRET,
        signOptions: { expiresIn: '70d' },
      }),
      inject: [ConfigService],
    }),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserScheme }]),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
