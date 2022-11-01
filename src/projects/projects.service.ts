/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorConverter } from 'src/common/tools/error-converter';
import { CreateProjectInterface } from './dto/create-project.interface';
import { ProjectsEntity, ProjectsEntityDocument } from './schemes/projects.scheme';

@Injectable()
export class ProjectsService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor(
		@InjectModel(ProjectsEntity.name)
		private projectsModel: Model<ProjectsEntityDocument>,
	) { }

	async create(projectDto: CreateProjectInterface): Promise<ProjectsEntityDocument> {
		try {
			const existedProject = await this.projectsModel.findById(projectDto._id).exec();

			const projectToDB: any = {
				...projectDto,
			}

			if (existedProject) {
				const updatedProject = await this.projectsModel
					.findByIdAndUpdate(existedProject._id, projectToDB)
					.setOptions({ new: true });
				return updatedProject;
			} else {
				const createProject = new this.projectsModel(projectToDB);
				const createdProject = await createProject.save();
				return createdProject;
			}

		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async getProjectList(): Promise<ProjectsEntityDocument[]> {
		try {
			const projects = await this.projectsModel
				.find({})
				.exec();
			return projects;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async getProjectById(projectId): Promise<ProjectsEntityDocument> {
		try {
			const project = await this.projectsModel.findById(projectId).exec();
			return project;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	// ml 
	// TODO:: replace it to another controller / table etc
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

	async mlGetAll(): Promise<any> {
		try {
			const projects = await this.projectsModel
				.find({})
				.exec();
			return projects;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async mlGetById(projectId): Promise<any> {
		try {
			const project = await this.projectsModel.findById(projectId).exec();
			return project;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}
}
