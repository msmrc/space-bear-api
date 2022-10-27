/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import {
  CreateUserDto,
  CreateUserRequestDto,
  UserResponseDto,
} from './dto/user.dto';
import { UserEntity, UserEntityDocument } from './user.scheme';
import { ErrorConverter } from 'src/common/tools/error-converter';
import { UserFormsService } from 'src/user-forms/user-forms.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntityDocument>,
  ) { }

  async createUser(userDto: CreateUserRequestDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const pswHash = await bcrypt.hash(userDto.password, salt);

      const userToDB: CreateUserDto = {
        email: userDto.email,
        passwordHash: pswHash,
      };

      const createUser = new this.userModel(userToDB);
      const createdUser = await createUser.save();

      return createdUser;
    } catch (e) {
      console.log('Error: ', e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async createAdmin(userDto: CreateUserRequestDto): Promise<any> {
    try {
      const salt = await bcrypt.genSalt();
      const pswHash = await bcrypt.hash(userDto.password, salt);

      const userToDB: CreateUserDto = {
        email: userDto.email,
        passwordHash: pswHash,
        role: userDto.role,
      };

      const createUser = new this.userModel(userToDB);
      const createdUser = await createUser.save();

      return createdUser;
    } catch (e) {
      console.log('Error: ', e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findById(id: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findById(id).exec();

      return user;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findByEmail(email: string): Promise<UserEntity> {
    try {
      const user = await this.userModel.findOne({ email: email }).exec();

      return user;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async removeUserProfile(id: string): Promise<boolean> {
    try {
      await this.userModel.findByIdAndDelete(id).exec();
      return true;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async getUserList(): Promise<UserEntity[]> {
    try {
      // or $nin for multiply condition
      const users = await this.userModel
        .find({ role: { $ne: 'superAdmin' } })
        .exec();
      return users;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }


  // ml
  public mockUsers = [
    {
      _id: '1',
      // основная информация
      firstName: 'Иван', // имя
      secondName: 'Иванов', // фамилия
      lastName: 'Иванович', // отчество
      birthDate: '26.10.1972', // дата рождения
      country: 'Россия', // страна
      city: 'Москва', // город
      citizenship: 'Российское', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '+95159195192',
        email: 'ivanov@yandex.ru',
        vk: '@ivanov',
        telegram: '@ivanov',
        skype: 'ivanov'
      },
      education: { // образование
        startDate: '10.10.1990',  // дата обучения 
        startEnd: '10.10.1996', // дата конца
        speciality: 'Компьютерные системы', // специальность
        universityName: 'МГУ', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'На себя', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '20', // опыт работы (лет)
        achievements: ['Победа в хакатоне 2021', 'Победа в хакатоне 2006', 'Работал в СБЕР'], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам
        categories: ['Капитан', 'Teamlead', 'Backend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['Excel', 'C#', '.net', 'Презентация', 'C++'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: true, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '51295195129512', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: true, // есть компания?
        companyINN: '52151295912959', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: 10, // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
    }
  ];

  async mlGetAll(): Promise<any> {
    try {
      return this.mockUsers;
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }


  async mlGetById(id: string): Promise<any> {
    try {
      return this.mockUsers.find(x => x._id === id);
    } catch (e) {
      console.warn(e);
      const error = e.code
        ? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
        : 'SERVER_ERROR';

      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

}
