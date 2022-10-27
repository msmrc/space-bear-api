/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ErrorConverter } from 'src/common/tools/error-converter';

@Injectable()
export class ProjectsService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() { }

	// ml
	public mockProjects = [
		{
			_id: '1',
			type: 'hackathon', // Выбирается на фронте из списка (Академия инноваторов, Хакатоны и цифровые конкурсы и тд) 
			projectName: 'Star Bear', // название
			projectDescription: 'Проект для поиска единомышленников и обмена идеями', // описание
			// Для всех проектов
			isPublished: true, // опубликован (доступен всем пользователям)
			projectTags: ['social', 'modern ui',], // теги проекта
			projectOwnerId: '1', // основатель проекта
			existTeam: [{ userId: '1', category: 'Teamlead', skills: ['Excel'] }],
			lookingForTeam: [{ category: 'Frontend', skills: ['Angular'] }],

			innovator: { // академия инноваторов
				projectLink: '', // ссылка на проект, если есть
				presentationFileId: '', // id на файл с презентацией
				supportExperience: ['accelerator', 'grants'], // опыт в мерах поддержки (гранты, инкубаторы и тд)
			},
			hackathon: { // хакатоны и цифровые конкурсы / и тд
				targetTask: { id: '1' }, // задача для участия
			},
			novatorOfMoscow: { // новатор Москвы
				inn: '', // ИНН Заявителя
				registration: '', // Адрес места жительства Заявителя (Прописка)
				supportExperience: [''], // Опыт участия в программах гос. поддержки (к примеру, гранты фонда содействия инноваций) 
				nomination: 'Проект будущего', // номинация, выбирается на сайте
				direction: 'Экология и охрана', // направление, выбирается на сайте
				revenue: '', // выручка, если есть
				projectReadinessStage: 'mvp', // стадия готовности проекта, выбирается на сайте
				projectLink: '', // ссылка на проект, если есть
				presentationFileId: '', // презентация
				businessPlanFileId: '', // бизнес план
				copyOfSecurityDocFileId: '', // копии охранных документов
				confirmationOfProjectProgress: ['', ''], // подтверждение развития проекта, ссылки на публикации, исследования и тд
				additional: {
					proofs: [ // подтверждение работоспособности 
						{
							fileId: '', // фото или видео	
						}
					],
					characteristics: [  // характеристики
						{
							key: '', // ключ, вводится на сайте
							value: '', // значение, вводится на сайте
						}
					]

				}
			},

			// Социальные элементы
			views: 10, // просмотры
			rate: [ // рейтинг
				{ userId: '1', count: 10 },
				{ userId: '2', count: -10 },
			],
			comments: [ // комментарии
				{
					userId: '1',
					comment: 'Невероятно!'
				}
			]
		}
	];

	async mlGetAll(): Promise<any> {
		try {
			return this.mockProjects;
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
			return this.mockProjects.find((x) => x._id === id);
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}
}
