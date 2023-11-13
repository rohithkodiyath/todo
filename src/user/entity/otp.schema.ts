
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,  } from "mongoose";
import { v4 as uuidv4 } from 'uuid';


export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {


  @Prop({type : Date, isRequired : false})
  dob: Date | null;

  @Prop({isRequired : true})
  email: string;

  @Prop({isRequired : true})
  firstName: string;

  @Prop({isRequired : true})
  lastName: string;

  @Prop({isRequired : true})
  password: string;

  @Prop({type : Date})
  updatedAt?: Date;

  @Prop()
  createdAt?: Date;

  @Prop({type : String, default : ()=> uuidv4() } )
  uuid: string;

}

export const UserSchema = SchemaFactory.createForClass(User);