/* eslint-disable prettier/prettier */
import { HttpModule } from '@nestjs/axios';
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
		HttpModule,
	],
	providers: [ProjectsService],
	exports: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule { }
