/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsEntity, ProjectsScheme } from './schemes/projects.scheme';

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ProjectsEntity.name, schema: ProjectsScheme },
		]),
	],
	providers: [ProjectsService],
	exports: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule { }
