
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { HydratedDocument, SchemaType } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import {  Schema as MongooseSchema } from 'mongoose';
import { User } from "./user.schema";
import * as process from "process";


export type UserDocument = HydratedDocument<Otp>;

@Schema({ timestamps: true })
export class Otp {

  //create a refernce object fo the user
  @Prop({type : MongooseSchema.Types.ObjectId, ref : "User"})
  user: User

  @Prop({type : Number})
  otp : number

  @Prop({type : Date})
  updatedAt?: Date;

  @Prop({type : Date ,expires : process.env.OTP_EXPIRY})
  createdAt?: Date;

  @Prop({type : String, default : ()=> uuidv4() } )
  uuid: string;

}

export const OtpSchema = SchemaFactory.createForClass(Otp);