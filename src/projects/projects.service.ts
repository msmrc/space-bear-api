/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ErrorConverter } from 'src/common/tools/error-converter';
import { AcceptToTeamInterface, CommentInterface, CreateProjectInterface, OutgoingTeamInterface, RateInterface } from './dto/create-project.interface';
import { ProjectsEntity, ProjectsEntityDocument } from './schemes/projects.scheme';
import { IncomeToTeamInterface } from './dto/create-project.interface';
@Injectable()
export class ProjectsService {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	constructor(
		@InjectModel(ProjectsEntity.name)
		private projectsModel: Model<ProjectsEntityDocument>
	) { }

	async acceptToTeam(accept: AcceptToTeamInterface): Promise<ProjectsEntityDocument> {
		try {
			const existedProject = await this.projectsModel.findById(accept.projectId).exec();

			if (existedProject) {
				const existingTeam = existedProject.existTeam;
				existingTeam.push({
					fullProfileId: accept.fullProfileId,
					category: accept.category,
					skills: accept.skills
				});

				if (accept.type === 'income') {
					const incomingTeam = existedProject.incomingTeam.filter(x => x.fullProfileId !== accept.fullProfileId);
					// удаляем из списка и записываем в existing team

					const projectToDB: any = {
						...existedProject,
						incomingTeam: incomingTeam,
						existTeam: existingTeam
					};

					const updatedProject = await this.projectsModel
						.findByIdAndUpdate(existedProject._id, projectToDB)
						.setOptions({ new: true });
					return updatedProject;
				}

				if (accept.type === 'outgoing') {
					const outgoingTeam = existedProject.outgoingTeam.filter(x => x.fullProfileId !== accept.fullProfileId);
					// удаляем из списка и записываем в existing team

					const projectToDB: any = {
						...existedProject,
						outgoingTeam: outgoingTeam,
						existTeam: existingTeam
					};

					const updatedProject = await this.projectsModel
						.findByIdAndUpdate(existedProject._id, projectToDB)
						.setOptions({ new: true });
					return updatedProject;
				}
			} else {
				throw new Error();
			}
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async outgoingToTeam(outgoing: OutgoingTeamInterface): Promise<ProjectsEntityDocument> {
		try {
			const existedProject = await this.projectsModel.findById(outgoing.projectId).exec();

			if (existedProject) {
				const outgoingTeam = existedProject.outgoingTeam;
				outgoingTeam.push({
					fullProfileId: outgoing.fullProfileId,
					category: outgoing.category,
					skills: outgoing.skills
				});

				const projectToDB: any = {
					...existedProject,
					outgoingTeam: outgoingTeam
				};

				const updatedProject = await this.projectsModel
					.findByIdAndUpdate(existedProject._id, projectToDB)
					.setOptions({ new: true });
				return updatedProject;
			} else {
				throw new Error();
			}
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async incomeToTeam(income: IncomeToTeamInterface): Promise<ProjectsEntityDocument> {
		try {
			const existedProject = await this.projectsModel.findById(income.projectId).exec();

			if (existedProject) {
				const incomingTeam = existedProject.incomingTeam;
				incomingTeam.push({
					fullProfileId: income.fullProfileId,
					category: income.category,
					skills: income.skills
				});

				const projectToDB: any = {
					...existedProject,
					income: incomingTeam
				};

				const updatedProject = await this.projectsModel
					.findByIdAndUpdate(existedProject._id, projectToDB)
					.setOptions({ new: true });
				return updatedProject;
			} else {
				throw new Error();
			}
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async updateRate(rate: RateInterface): Promise<ProjectsEntityDocument> {
		try {
			const existedProject = await this.projectsModel.findById(rate.projectId).exec();

			if (existedProject) {
				const rates = existedProject.rate;
				rates.push({
					count: rate.count,
					fullProfileId: rate.fullProfileId
				});

				const projectToDB: any = {
					...existedProject,
					comments: rates
				};

				const updatedProject = await this.projectsModel
					.findByIdAndUpdate(existedProject._id, projectToDB)
					.setOptions({ new: true });
				return updatedProject;
			} else {
				throw new Error();
			}
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async comment(comment: CommentInterface): Promise<ProjectsEntityDocument> {
		try {
			const existedProject = await this.projectsModel.findById(comment.projectId).exec();

			if (existedProject) {

				const comments = existedProject.comments;
				comments.push({
					comment: comment.comment,
					fullProfileId: comment.fullProfileId
				});

				const projectToDB: any = {
					...existedProject,
					comments: comments
				};

				const updatedProject = await this.projectsModel
					.findByIdAndUpdate(existedProject._id, projectToDB)
					.setOptions({ new: true });

				return updatedProject;
			} else {
				throw new Error();
			}
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

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
				.populate('existTeam.fullProfileId')
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
			const project = await this.projectsModel
				.findById(projectId)
				.populate('existTeam.fullProfileId')
				.populate('incomingTeam.fullProfileId')
				.populate('outgoingTeam.fullProfileId')
				.populate('rate.fullProfileId')
				.populate('comments.fullProfileId')
				.exec();

			const updatedCounter = +project.views + 1;

			await this.projectsModel
				.findByIdAndUpdate(projectId, {
					views: updatedCounter,
				})
				.setOptions({ new: true });

			return project;
		} catch (e) {
			console.warn(e);
			const error = e.code
				? ErrorConverter.convertErrorToText(e.code, e.keyPattern, e.keyValue)
				: 'SERVER_ERROR';

			throw new HttpException(error, HttpStatus.FORBIDDEN);
		}
	}

	async getProjectsByMemberId(ownerId): Promise<ProjectsEntityDocument[]> {
		try {
			const projects = await this.projectsModel.find({ "existTeam.fullProfileId": ownerId }).exec();
			return projects;
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
		'искусственный интеллект',
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
