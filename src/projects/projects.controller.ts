/* eslint-disable prettier/prettier */
import {
	Controller,
	Get,
	Logger,
	Param,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('api/projects')
export class ProjectsController {
	private readonly logger = new Logger(ProjectsController.name);

	constructor(private projectsService: ProjectsService) { }

	// FOR ML TESTS
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
}