/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Get,
	Logger,
	Param,
	Post,
} from '@nestjs/common';
import { CreateProjectInterface } from './dto/create-project.interface';
import { ProjectsService } from './projects.service';
import { ProjectsEntityDocument } from './schemes/projects.scheme';

@Controller('api/projects')
export class ProjectsController {
	private readonly logger = new Logger(ProjectsController.name);

	constructor(private projectsService: ProjectsService) { }


	@Get('get-all-projects')
	getProjectList() {
		this.logger.log('Handling getProjectList() request...');
		return this.projectsService.getProjectList();
	}

	@Post('create')
	create(@Body() project: CreateProjectInterface): Promise<any> {
		this.logger.log('Handling create() request...');
		return this.projectsService.create(project);
	}

	@Get('get-project-by-id/:id')
	getProjectById(@Param('id') id: string): Promise<ProjectsEntityDocument> {
		this.logger.log('Handling getProjectById() request...');
		return this.projectsService.getProjectById(id);
	}

	@Get('get-projects-by-owner-id/:id')
	getProjectsByOwnerId(@Param('id') id: string): Promise<ProjectsEntityDocument[]> {
		this.logger.log('Handling getProjectByOwnerId() request...');
		return this.projectsService.getProjectsByOwnerId(id);
	}

	// START ML 
	@Get('ml-get-all')
	mlGetAll(): any {
		return this.projectsService.mlGetAll();
	}

	@Get('ml-get-by-id/:id')
	mlGetById(@Param('id') id: string): any {
		return this.projectsService.mlGetById(id);
	}

	@Get('ml-get-all-skills-and-categories')
	mlGetAllSkillsAndCategories(): any {
		return this.projectsService.mlGetAllSkillsAndCategories();
	}

	@Get('ml-get-all-tags')
	mlGetAllTags(): any {
		return this.projectsService.mlGetAllTags();
	}

	// END ML
}