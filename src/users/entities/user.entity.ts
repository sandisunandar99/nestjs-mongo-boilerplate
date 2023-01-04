import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ApiProperty } from "@nestjs/swagger";
import { randomUUID } from "crypto";
import * as mongoose from 'mongoose';

export type UserDocument = User & Document;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @ApiProperty({
    example: 'xxxxxx-xxxxx-xxxxx-xxxxx',
    description: 'ID of users ',
  })
  @Prop({
    required: true,
    index: { unique: true },
    default: () => randomUUID,
  })
  userId: string;

  @ApiProperty({
    example: 'sandi sunandar',
    description: 'Fill fullname of user',
  })
  @Prop({
    required: false,
    index: true,
  })
  fullname: string;

  @ApiProperty({
    example: 'example@example.com',
    description: 'Fill email of user',
  })
  @Prop({
    required: true,
    index: { unique: true },
    lowercase: true,
  })
  email: string;

  @ApiProperty({
    example: '081234567890',
    description: 'Fill phone number of user',
  })
  @Prop({
    required: true,
  })
  phone: string;

  @ApiProperty({
    example: 'user123',
    description: 'Fill username for credentials',
  })
  @Prop({
    required: true,
    index: { unique: true },
    lowercase: true,
  })
  username: string;

  @ApiProperty({
    example: 'Secret123',
    description: 'Fill password using Uppercase lowercase and number',
  })
  @Prop({
    required: true,
  })
  password: string;

  @ApiProperty({
    example: 'false',
    description: 'true or false',
  })
  @Prop({
    required: false,
    default: false,
  })
  is_admin? :boolean = false;

  @ApiProperty({
    example: 'false',
    description: 'true or false',
  })
  @Prop({
    required: false,
    default: false,
  })
  is_active? : boolean = false;

  @ApiProperty({
    example: 'User123',
    description: 'Who has deleted users',
  })
  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  })
  user_deleted_by: User;

  @ApiProperty({
    example: '20130623T13:22-0500',
    description: 'Last user deleted at',
  })
  @Prop({
    required: false,
    default: null
  })
  user_deleted_at: Date;

  @ApiProperty({
    example: '20130623T13:22-0500',
    description: 'Last user login',
  })
  @Prop({
    required: false,
    default: null
  })
  last_login_at: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);