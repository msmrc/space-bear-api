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
  public tags = [
    'modern ui',
    'biotech',
    'fintech',
    'ai',
    'ar/vr',
    'game',
    'social',
    'производство',
    'машиностроение',
    'робототехника',
    'программное обеспечение',
    'sass',
    'продажи',
    'умный дом',
    'edtech',
    'foodtech',
    'mental health',
    'знакомства и общение',
    'стартапы',
  ];
  public skillsAndCategories = [
    {
      category: 'Teamlead',
      skills: ['Excel', 'Управление командой', 'Презентация', 'CustDev']
    },
    {
      category: 'Project Manager',
      skills: ['Excel', 'Управление командой', 'Презентация', 'CustDev']
    },
    {
      category: 'Product Owner',
      skills: ['Excel', 'Управление командой', 'Презентация', 'CustDev']
    },
    {
      category: 'Капитан',
      skills: ['Excel', 'Управление командой', 'Презентация', 'CustDev']
    },
    {
      category: 'Backend',
      skills: ['C++', 'Node js', 'Nest js', 'JavaScript', 'C#', '.net', 'Python', 'TypeScript', 'Математический анализ', 'Java']
    },
    {
      category: 'Frontend',
      skills: ['Node js', 'JavaScript', 'C#', 'Python', 'TypeScript', 'Angular 2+', 'React js', 'Vue js', 'Java']
    },
    {
      category: 'Mobile',
      skills: ['Ionic', 'Java']
    },
    {
      category: 'ML',
      skills: ['Node js', 'JavaScript', 'C#', 'Python', 'TypeScript', 'Математический анализ', 'Java']
    },
    {
      category: 'Design',
      skills: ['Figma']
    },
    {
      category: 'Marketing',
      skills: ['SMM', 'SEO', 'Context', 'Target']
    }
  ]

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
      skillInformation: { // информация по скиллам*********
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
        countHackathons: '10', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['social', 'modern ui'], // что интересно (vr / ml / экология)
      experience: '1000', // уровень
      aboutDescription: 'Я уже опытный разработчик, хочу участвовать в разработке социальной сети. Есть несколько крутых идей, с помощью которых мы изменим мир!', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '2',
      // основная информация
      firstName: 'Михаил', // имя
      secondName: 'Романов', // фамилия
      lastName: 'Иванович', // отчество
      birthDate: '26.10.2000', // дата рождения
      country: 'Россия', // страна
      city: 'Ижевск', // город
      citizenship: 'Российское', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '+9542512775192',
        email: 'romanov@yandex.ru',
        vk: '@romanov',
        telegram: '@romanov',
        skype: 'romanov'
      },
      education: { // образование
        startDate: '10.10.2017',  // дата обучения 
        startEnd: '10.10.2022', // дата конца
        speciality: 'Биологические Технологии', // специальность
        universityName: 'ИГУ', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'Без работы', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '2', // опыт работы (лет)
        achievements: ['Закончил школу с золотой медалью'], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Backend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['C++', 'Математический анализ'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '1', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['biotech', 'ar/vr'], // что интересно (vr / ml / экология)
      aboutDescription: 'Я закончил институт на биотехнологиях, есть идея по разработке программы в AR / VR, которая ускорит разработку лекарственных препаратов', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '3',
      // основная информация
      firstName: 'Алексей', // имя
      secondName: 'Журавлев', // фамилия
      lastName: 'Иванович', // отчество
      birthDate: '26.10.1996', // дата рождения
      country: 'Россия', // страна
      city: 'Воронеж', // город
      citizenship: 'Российское', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '+9612627552',
        email: 'juravlev@yandex.ru',
        vk: '@juravlev',
        telegram: '@juravlev',
        skype: 'juravlev'
      },
      education: { // образование
        startDate: '10.10.2017',  // дата обучения 
        startEnd: '10.10.2022', // дата конца
        speciality: 'Разработка', // специальность
        universityName: 'ВГУ', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '3', // опыт работы (лет)
        achievements: ['Выиграл 1 хакатон'], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Frontend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['Angular'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '1', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['ai', 'fintech'], // что интересно (vr / ml / экология)
      aboutDescription: 'Я джуниор frontend разработчик, интересны проекты с ИИ и финтех', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '4',
      // основная информация
      firstName: 'Дарья', // имя
      secondName: 'Фет', // фамилия
      lastName: 'Ивановна', // отчество
      birthDate: '26.10.2002', // дата рождения
      country: 'Россия', // страна
      city: 'Воронеж', // город
      citizenship: 'Российское', // гражданство
      gender: 'Женский', // пол
      contacts: { // контакты
        phone: '+9532527552',
        email: 'fet@yandex.ru',
        vk: '@fet',
        telegram: '@fet',
        skype: 'fet'
      },
      education: { // образование
        startDate: '10.10.2017',  // дата обучения 
        startEnd: '10.10.2022', // дата конца
        speciality: 'Разработка', // специальность
        universityName: 'ВГУ', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '1', // опыт работы (лет)
        achievements: ['Выиграл 1 хакатон'], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Design'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['Figma'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '4', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['ai'], // что интересно (vr / ml / экология)
      aboutDescription: 'Я начинающий дизайнер, интересно всё что связано с ИИ', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '5',
      // основная информация
      firstName: 'ALIWONK', // имя
      secondName: 'Baldan', // фамилия
      lastName: '', // отчество
      birthDate: '26.10.2002', // дата рождения
      country: 'Россия', // страна
      city: '', // город
      citizenship: '', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '',
        email: '',
        vk: '',
        telegram: '',
        skype: ''
      },
      education: { // образование
        startDate: '',  // дата обучения 
        startEnd: '', // дата конца
        speciality: '', // специальность
        universityName: '', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '2', // опыт работы (лет)
        achievements: [''], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Frontend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['React js', 'JavaScript', 'Node js'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '4', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['social', 'game', 'fintech'], // что интересно (vr / ml / экология)
      aboutDescription: 'Обожаю в уютные вечера погрузиться в виртуальные миры, которые расслабляет тебя своей историей. Хорошо помогает отвлечься от тяжелого дня. В душе навсегда остались такие шедевры как: Withcer 3, Sekiro Shadow Die Twice, Bloodborne, Metro, RDR 2, God of War. Еще периодически люблю пойти в зал, чтобы выпустить свой накопленный в течении дня негатив. Работаю с javascript уже 1.5 года. Смогу решить задачи выше среднее уровня, разработаю сайты используя универсальность JS. Есть опыт на frontend: React, animeJs, Fetch. Также есть опыт на backend: Node JS, Express Js, Nest JS, MysSql(использую TypeOrm), MongoDb. Черпал и осваивал все знание из открытых источников: YouTube, google, документации, статьи и т.д', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '6',
      // основная информация
      firstName: 'Арина', // имя
      secondName: 'Лялина', // фамилия
      lastName: '', // отчество
      birthDate: '', // дата рождения
      country: 'Россия', // страна
      city: '', // город
      citizenship: '', // гражданство
      gender: 'Женский', // пол
      contacts: { // контакты
        phone: '',
        email: '',
        vk: '',
        telegram: '',
        skype: ''
      },
      education: { // образование
        startDate: '',  // дата обучения 
        startEnd: '', // дата конца
        speciality: '', // специальность
        universityName: '', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '1', // опыт работы (лет)
        achievements: [''], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Marketing'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['SMM'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '2', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['edtech'], // что интересно (vr / ml / экология)
      aboutDescription: 'Привет! Меня зовут Арина и я руководитель команды и проекта - STUDY IT. STUDY IT - это платформа для обучения, где каждый может записать свой курс, используя готовые инструменты, выставить цену и обрести новых клиентов, а также получить новые знания по выгодным ценам! Расширяем команду проекта, чтобы быстрее развивать и выводить на рынок наш проект. Поддержка проекта со стороны топовых экспертов EdTech! Требуются: графические и веб дизайнеры, frontend и backend разработчики, маркетологи', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '7',
      // основная информация
      firstName: 'S', // имя
      secondName: '', // фамилия
      lastName: '', // отчество
      birthDate: '', // дата рождения
      country: 'Россия', // страна
      city: '', // город
      citizenship: '', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '',
        email: '',
        vk: '',
        telegram: '',
        skype: ''
      },
      education: { // образование
        startDate: '',  // дата обучения 
        startEnd: '', // дата конца
        speciality: '', // специальность
        universityName: '', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '2', // опыт работы (лет)
        achievements: [''], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Backend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['Java'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '0', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['fintech', 'social', 'знакомства и общение'], // что интересно (vr / ml / экология)
      aboutDescription: 'Студент московского вуза, работаю разработчиком java back. В среднесрочных целях - переезд в другую страну с получением там работы, в связи с этим много работаю и учусь Помимо тех знаний интересуюсь различными направлениями от английского и психологии до нейробиологии и нутрициологии, в основном всем тем, что помогает эффективнее учится и лучше себя чувствовать. Год коммерческого опыта в разработке на java. Работаю в альфа-банке, занимаюсь разработкой бэкенда для мобильного приложения На начальном уровне знаю c++, python, машинное обучение. В моих планах развиваться как it специалист, а это происходит быстрее при обмене опытом, если вам интересно, то можем попробовать вместе начать какой нибудь проект учебный/коммерческий или просто иметь контакты друг друга и обращаться за помощью', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '8',
      // основная информация
      firstName: 'Сергей', // имя
      secondName: '', // фамилия
      lastName: '', // отчество
      birthDate: '', // дата рождения
      country: 'Россия', // страна
      city: '', // город
      citizenship: '', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '',
        email: '',
        vk: '',
        telegram: '',
        skype: ''
      },
      education: { // образование
        startDate: '',  // дата обучения 
        startEnd: '', // дата конца
        speciality: '', // специальность
        universityName: '', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '15', // опыт работы (лет)
        achievements: [''], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Backend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['Java'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '0', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['fintech', 'social', 'знакомства и общение'], // что интересно (vr / ml / экология)
      aboutDescription: 'Студент московского вуза, работаю разработчиком java back. В среднесрочных целях - переезд в другую страну с получением там работы, в связи с этим много работаю и учусь Помимо тех знаний интересуюсь различными направлениями от английского и психологии до нейробиологии и нутрициологии, в основном всем тем, что помогает эффективнее учится и лучше себя чувствовать. Год коммерческого опыта в разработке на java. Работаю в альфа-банке, занимаюсь разработкой бэкенда для мобильного приложения На начальном уровне знаю c++, python, машинное обучение. В моих планах развиваться как it специалист, а это происходит быстрее при обмене опытом, если вам интересно, то можем попробовать вместе начать какой нибудь проект учебный/коммерческий или просто иметь контакты друг друга и обращаться за помощью', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '9',
      // основная информация
      firstName: 'Алдар', // имя
      secondName: '', // фамилия
      lastName: '', // отчество
      birthDate: '', // дата рождения
      country: 'Россия', // страна
      city: '', // город
      citizenship: '', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '',
        email: '',
        vk: '',
        telegram: '',
        skype: ''
      },
      education: { // образование
        startDate: '',  // дата обучения 
        startEnd: '', // дата конца
        speciality: '', // специальность
        universityName: '', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '15', // опыт работы (лет)
        achievements: [''], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Капитан / Project Manager / Product Owner'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['Excel', 'Управление командой', 'Презентация', 'CustDev'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '0', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['mental health', 'social', 'знакомства и общение'], // что интересно (vr / ml / экология)
      aboutDescription: 'Я джун продакт. Мне 20 лет и я живу в Улан-Удэ, Бурятия. Учился на политолога, но с пандемии и фильма Дудя решил бросить универ и уйти в айти. Хотел изначально развивать стартапы, но после нескольких неудачных попыток и бесчисленного количества ошибок я пришел к выводу, что лучше набраться опыта, углубиться в теорию создания продуктов и поработать в команде! Ищу стартап, где могу набраться опытом, взять на себя больше отвественности и поработать в команде! Пишите в телегу (t.me/asaldasar), там я точно на связи:). Уже полтора года в IT сфере и последние полгода в продакт-менеджменте. Развивал два проекта (Tinder для поиска друзей и групповая терапия онлайн) и допустил такие ошибки: 1. Не протестировал самые рискованные гипотезы через фрейморк RAT (в следующий раз не буду разрабатывать сразу сайт и решение, пока не пойму, что нет других способов протестировать гипотезу) 2. В команде не выстроил крутую коммуникацию (сейчас страюсь выявить мотивацию каждого члена команды, указывать сроки и ограничения в самом начале, не давать четкое решение, а обсуждать её со специалистом и налаживать общение внутри команды) 3, Кастдевы и аналитика. В первую очередь важно анализировать рынок и конкурентов, думать о проблеме, а не о решении. В кастдевах спрашивать про текущие решения, мотивацию и степень неудовлетворенности решением. Прохожу сейчас курсы, читаю статьи, блоги, книги и смотрю видео, самостоятельно тестирую гипотезы и провожу кастдевы. Стараюсь на практике применить полученные знания. Хочу залететь в стартап и помогать с созданием продукта. Сфера не принципиальна, мой опыт в основном был с b2c. Я 4 года работал в медиа, поэтому мне близко всё, что связано с creator economy, edtech, fintech и mental health', // описание о себе, "хочу сделать мир лучше и тд" 
    },
    {
      _id: '10',
      // основная информация
      firstName: 'Ilya ', // имя
      secondName: '', // фамилия
      lastName: '', // отчество
      birthDate: '', // дата рождения
      country: 'Россия', // страна
      city: '', // город
      citizenship: '', // гражданство
      gender: 'Мужской', // пол
      contacts: { // контакты
        phone: '',
        email: '',
        vk: '',
        telegram: '',
        skype: ''
      },
      education: { // образование
        startDate: '',  // дата обучения 
        startEnd: '', // дата конца
        speciality: '', // специальность
        universityName: '', // название ВУЗа
      },
      jobInformation: { // информация о работе 
        employment: 'По найму', // занятость (на сайте) - (по найму, на себя, без работы)
        jobExperience: '3', // опыт работы (лет)
        achievements: [''], // достижения / проф. опыт
      },
      skillInformation: { // информация по скиллам*********
        categories: ['Frontend'], // категории (Роль в команде) (Frontend, Manager, Backend и тд)
        skills: ['React js'], // умения (Python, c#, javascript, excel и тд)
      },
      intellectualProperty: { // информация об интеллектуальной собственности 
        isIntellectualPropertyAuthor: false, // 15.	Является ли автором объектов интеллектуальной собственности (есть ли патент)? Если да, то запрос реквизитов документа.
        numberOfDocument: '', // номер документа
      },
      companyInformation: { // информация о компании
        isCompanyOwner: false, // есть компания?
        companyINN: '', // ИНН компании
      },
      hackathon: { // хакатоны и цифровые конкурсы / и тд
        countHackathons: '0', // опыт участия в хаках, кол-во
        additional: { // резюме, портфолио, гитхаю и тд
          github: '',
          linkedin: '',
          cv: '', // резюме
        }
      },
      interestedTags: ['mental health', 'social', 'знакомства и общение'], // что интересно (vr / ml / экология)
      aboutDescription: '2,5 года занимаюсь разработкой крупной системы для менеджмента работников крупных предприятий. Хотелось бы найти интересный стартап/ проект для повышения своим навыков', // описание о себе, "хочу сделать мир лучше и тд" 
    },
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
