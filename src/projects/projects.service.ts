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
			projectName: '', // название
			projectDescription: '', // описание

			innovator: {
				projectLink: '', // ссылка на проект, если есть
				presentationFileId: '', // id на файл с презентацией
				supportExperience: ['accelerator', 'grants'], // опыт в мерах поддержки (гранты, инкубаторы и тд)
			},
			existTeam: [{ userId: '1' }],
			lookingForTeam: [{ category: 'Frontend', skills: ['Angular'] }],
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
