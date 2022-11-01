/* eslint-disable prettier/prettier */
// этот файл необходим для создания модели в Базе Данных
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserEntity } from 'src/users/user.scheme';
import * as mongoose from 'mongoose';

export type ProjectsEntityDocument = ProjectsEntity & Document;

@Schema({
  timestamps: true,
})
export class ProjectsEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserEntity',
    required: true,
    unique: true,
  })
  projectOwnerId: UserEntity;

  @Prop()
  type: string;

  @Prop()
  projectName: string;

  @Prop()
  projectDescription: string;

  @Prop({ default: true })
  isPublished: boolean;

  @Prop()
  projectTags: string[];

  @Prop({
    type: [
      {
        userId: { type: String },
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  existTeam: { userId: string; skills: string[]; category: string }[];

  @Prop({
    type: [
      {
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  lookingForTeam: { skills: string[]; category: string }[];


  @Prop({
    type: [
      {
        userId: { type: String },
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  incomingTeam: { userId: string; skills: string[]; category: string }[];


  @Prop({
    type: [
      {
        userId: { type: String },
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  outgoingTeam: { userId: string; skills: string[]; category: string }[];

  @Prop({
    type: [
      {
        rate: { type: String },
        solution: { type: String },
        publishDate: { type: String },
      }
    ]
  })
  projectCostByAdmin: { rate: string; solution: string; publishDate: string }[];

  @Prop({ default: false })
  isInnovated: boolean;


  @Prop({
    type:
    {
      projectLink: { type: String },
      presentationFileId: { type: String },
      supportExperience: { type: [String] },
    }

  })
  innovator: { projectLink: string; presentationFileId: string; supportExperience: string[] };

  @Prop({ default: 1 })
  views: number;

  @Prop({
    type: [
      {
        userId: { type: String },
        count: { type: Number },
      }
    ]
  })
  rate: { userId: string; count: number; }[];

  @Prop({
    type: [
      {
        userId: { type: String },
        comment: { type: String },
      }
    ]
  })
  comments: { userId: string; comment: string; }[];
}
export const ProjectsScheme = SchemaFactory.createForClass(ProjectsEntity);
