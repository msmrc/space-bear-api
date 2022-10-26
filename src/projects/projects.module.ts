/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';


@Module({
	imports: [
	],
	providers: [ProjectsService],
	exports: [ProjectsService],
	controllers: [ProjectsController],
})
export class ProjectsModule { }
