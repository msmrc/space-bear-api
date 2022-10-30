/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ErrorConverter } from 'src/common/tools/error-converter';

@Injectable()
export class ProjectsService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor() { }

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

	async mlGetAllSkillsAndCategories(): Promise<any> {
		try {
			return this.skillsAndCategories;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}
	async mlGetAllTags(): Promise<any> {
		try {
			return this.tags;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

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
			lookingForTeam: [{ category: 'Frontend', skills: ['Angular'] }, { category: 'Backend', skills: ['C#', 'Node js', 'Nest js'] }, { category: 'Frontend', skills: ['React'] }],
			projectCostByAdmin: [{
				rate: '', // хорошо / плохо
				solution: '', // готово к продвижению / нужны доработки
				publishDate: '', // 
			}
			],
			isInnovated: false, // идея инновационная? да / нет

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
		},
		{
			_id: '2',
			type: 'novatorOfMoscow', // Выбирается на фронте из списка (Академия инноваторов, Хакатоны и цифровые конкурсы и тд) 
			projectName: 'NovaMoscow', // название
			projectDescription: 'Высокоэффективные композиционные материалы на основе аэрогелей для создания инновационной среды города будущего', // описание
			// Для всех проектов
			isPublished: true, // опубликован (доступен всем пользователям)
			projectTags: ['social', 'modern ui',], // теги проекта
			projectOwnerId: '2', // основатель проекта
			existTeam: [{ userId: '2', category: 'Frontend', skills: ['Angular'] }, { userId: '3', category: 'Backend', skills: ['C#', 'C++'] }],
			lookingForTeam: [{ category: 'Frontend', skills: ['Angular'] }, { category: 'Backend', skills: ['C#', 'C++'] }],
			projectCostByAdmin: [{
				rate: '', // хорошо / плохо
				solution: '', // готово к продвижению / нужны доработки
				publishDate: '', // 
			}
			],
			isInnovated: true, // идея инновационная? да / нет

			innovator: { // академия инноваторов
				projectLink: '', // ссылка на проект, если есть
				presentationFileId: '', // id на файл с презентацией
				supportExperience: ['accelerator', 'grants'], // опыт в мерах поддержки (гранты, инкубаторы и тд)
			},
			hackathon: { // хакатоны и цифровые конкурсы / и тд
				targetTask: { id: '1' }, // задача для участия
			},
			novatorOfMoscow: { // новатор Москвы
				inn: '46363463436', // ИНН Заявителя
				registration: 'Москва', // Адрес места жительства Заявителя (Прописка)
				supportExperience: ['accelerator'], // Опыт участия в программах гос. поддержки (к примеру, гранты фонда содействия инноваций) 
				nomination: 'Проект будущего', // номинация, выбирается на сайте
				direction: 'Экология и охрана', // направление, выбирается на сайте
				revenue: '510000', // выручка, если есть
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
			views: 50, // просмотры
			rate: [ // рейтинг
				{ userId: '1', count: 10 },
				{ userId: '2', count: -10 },
				{ userId: '3', count: -10 },
				{ userId: '4', count: -10 },
				{ userId: '5', count: -10 },
			],
			comments: [ // комментарии
				{
					userId: '1',
					comment: 'Мда, выглядит не очень'
				}
			]
		},
		{
			_id: '3',
			type: 'innovator', // Выбирается на фронте из списка (Академия инноваторов, Хакатоны и цифровые конкурсы и тд) 
			projectName: 'Innovator ->', // название
			projectDescription: 'Облачный сервис мониторинга и управления бортовыми системами транспортных средств', // описание
			// Для всех проектов
			isPublished: true, // опубликован (доступен всем пользователям)
			projectTags: ['ai', 'робототехника',], // теги проекта
			projectOwnerId: '2', // основатель проекта
			existTeam: [{ userId: '2', category: 'Frontend', skills: ['Angular'] }],
			lookingForTeam: [{ category: 'Backend', skills: ['C++'] }, { category: 'Backend', skills: ['C#'] }],
			projectCostByAdmin: [{
				rate: '', // хорошо / плохо
				solution: '', // готово к продвижению / нужны доработки
				publishDate: '', // 
			}
			],
			isInnovated: true, // идея инновационная? да / нет

			innovator: { // академия инноваторов
				projectLink: '', // ссылка на проект, если есть
				presentationFileId: '', // id на файл с презентацией
				supportExperience: ['accelerator', 'grants'], // опыт в мерах поддержки (гранты, инкубаторы и тд)
			},
			hackathon: { // хакатоны и цифровые конкурсы / и тд
				targetTask: { id: '1' }, // задача для участия
			},
			novatorOfMoscow: { // новатор Москвы
				inn: '46363463436', // ИНН Заявителя
				registration: 'Москва', // Адрес места жительства Заявителя (Прописка)
				supportExperience: ['accelerator'], // Опыт участия в программах гос. поддержки (к примеру, гранты фонда содействия инноваций) 
				nomination: 'Проект будущего', // номинация, выбирается на сайте
				direction: 'Экология и охрана', // направление, выбирается на сайте
				revenue: '510000', // выручка, если есть
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
			views: 50, // просмотры
			rate: [ // рейтинг
				{ userId: '1', count: 10 },
				{ userId: '2', count: -10 },
				{ userId: '3', count: -10 },
				{ userId: '4', count: -10 },
				{ userId: '5', count: -10 },
			],
			comments: [ // комментарии
				{
					userId: '1',
					comment: 'Мда, выглядит не очень'
				}
			]
		},
		{
			_id: '3',
			type: 'innovator', // Выбирается на фронте из списка (Академия инноваторов, Хакатоны и цифровые конкурсы и тд) 
			projectName: 'Новое освещение', // название
			projectDescription: 'Новые люминесцентные материалы для биологически безопасного энергоэффективного освещения', // описание
			// Для всех проектов
			isPublished: true, // опубликован (доступен всем пользователям)
			projectTags: ['ai', 'biotech',], // теги проекта
			projectOwnerId: '2', // основатель проекта
			existTeam: [{ userId: '2', category: 'Frontend', skills: ['Angular'] }],
			lookingForTeam: [{ category: 'Backend', skills: ['C++'] }, { category: 'Backend', skills: ['C#'] }],
			projectCostByAdmin: [{
				rate: '', // хорошо / плохо
				solution: '', // готово к продвижению / нужны доработки
				publishDate: '', // 
			}
			],
			isInnovated: true, // идея инновационная? да / нет

			innovator: { // академия инноваторов
				projectLink: '', // ссылка на проект, если есть
				presentationFileId: '', // id на файл с презентацией
				supportExperience: ['accelerator', 'grants'], // опыт в мерах поддержки (гранты, инкубаторы и тд)
			},
			hackathon: { // хакатоны и цифровые конкурсы / и тд
				targetTask: { id: '1' }, // задача для участия
			},
			novatorOfMoscow: { // новатор Москвы
				inn: '46363463436', // ИНН Заявителя
				registration: 'Москва', // Адрес места жительства Заявителя (Прописка)
				supportExperience: ['accelerator'], // Опыт участия в программах гос. поддержки (к примеру, гранты фонда содействия инноваций) 
				nomination: 'Проект будущего', // номинация, выбирается на сайте
				direction: 'Экология и охрана', // направление, выбирается на сайте
				revenue: '510000', // выручка, если есть
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
			views: 120, // просмотры
			rate: [ // рейтинг
				{ userId: '1', count: 10 },
				{ userId: '2', count: -10 },
				{ userId: '3', count: -10 },
				{ userId: '4', count: 10 },
				{ userId: '5', count: 10 },
				{ userId: '6', count: 10 },
				{ userId: '7', count: 10 },
				{ userId: '8', count: 10 },
				{ userId: '9', count: 10 },
				{ userId: '10', count: -10 },
			],
			comments: [ // комментарии
				{
					userId: '1',
					comment: 'Мда, выглядит не очень'
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
