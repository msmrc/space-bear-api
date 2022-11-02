/* eslint-disable prettier/prettier */
// этот файл необходим для создания модели в Базе Данных
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserEntity } from 'src/users/user.scheme';
import * as mongoose from 'mongoose';
import { UserFormEntity } from 'src/user-forms/schemes/user-forms.scheme';

export type ProjectsEntityDocument = ProjectsEntity & Document;

@Schema({
  timestamps: true,
})
export class ProjectsEntity {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserFormEntity',
    required: true,
  })
  projectOwnerId: UserFormEntity;

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
        fullProfileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserFormEntity',
        },
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  existTeam: { fullProfileId: UserFormEntity; skills: string[]; category: string }[];

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
        fullProfileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserFormEntity',
        },
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  incomingTeam: { fullProfileId: UserFormEntity; skills: string[]; category: string }[];


  @Prop({
    type: [
      {
        fullProfileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserFormEntity',
        },
        category: { type: String },
        skills: { type: [String] },
      }
    ]
  })
  outgoingTeam: { fullProfileId: UserFormEntity; skills: string[]; category: string }[];

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
        fullProfileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserFormEntity',
        },
        count: { type: Number },
      }
    ]
  })
  rate: { fullProfileId: UserFormEntity; count: number; }[];

  @Prop({
    type: [
      {
        fullProfileId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'UserFormEntity',
        },
        comment: { type: String },
      }
    ]
  })
  comments: { fullProfileId: UserFormEntity; comment: string; }[];
}
export const ProjectsScheme = SchemaFactory.createForClass(ProjectsEntity);
