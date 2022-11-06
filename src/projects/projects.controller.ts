/* eslint-disable prettier/prettier */
import {
	Body,
	Controller,
	Get,
	Logger,
	Param,
	Post,
} from '@nestjs/common';
import { AcceptToTeamInterface, CommentInterface, CreateProjectInterface, IncomeToTeamInterface, OutgoingTeamInterface, RateInterface } from './dto/create-project.interface';
import { ProjectsService } from './projects.service';
import { ProjectsEntityDocument } from './schemes/projects.scheme';

@Controller('api/projects')
export class ProjectsController {
	private readonly logger = new Logger(ProjectsController.name);

	constructor(private projectsService: ProjectsService) { }

	@Post('accept-to-team')
	acceptToTeam(@Body() income: AcceptToTeamInterface): Promise<any> {
		this.logger.log('Handling acceptToTeam() request...');
		return this.projectsService.acceptToTeam(income);
	}

	@Post('outgoing-to-team')
	outgoingToTeam(@Body() income: OutgoingTeamInterface): Promise<any> {
		this.logger.log('Handling outgoingToTeam() request...');
		return this.projectsService.outgoingToTeam(income);
	}

	@Post('income-to-team')
	incomeToTeam(@Body() income: IncomeToTeamInterface): Promise<any> {
		this.logger.log('Handling incomeToTeam() request...');
		return this.projectsService.incomeToTeam(income);
	}

	@Post('comment')
	comment(@Body() comment: CommentInterface): Promise<any> {
		this.logger.log('Handling comment() request...');
		return this.projectsService.comment(comment);
	}

	@Post('update-rate')
	updateRate(@Body() rate: RateInterface): Promise<any> {
		this.logger.log('Handling updateRate() request...');
		return this.projectsService.updateRate(rate);
	}

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

	@Get('get-projects-by-member-id/:id')
	getProjectsByMemberId(@Param('id') id: string): Promise<ProjectsEntityDocument[]> {
		this.logger.log('Handling getProjectsByMemberId() request...');
		return this.projectsService.getProjectsByMemberId(id);
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
	@Get('remove-all-1')
	removeAll(): any {
		return this.projectsService.removeAll();
	}
}