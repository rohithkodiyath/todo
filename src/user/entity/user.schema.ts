
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument,  } from "mongoose";
import uuid from "uuid"


export type CatDocument = HydratedDocument<Cat>;

@Schema({ timestamps: true })
export class UserEntity{


  @Prop({type : Date, isRequired : false})
  dob: Date | null;

  @Prop({isRequired : true})
  email: string;

  @Prop({isRequired : true})
  firstName: string;

  @Prop({isRequired : true})
  lastName: string;

  @Prop({type : Date})
  updatedAt?: Date;

  @Prop()
  createdAt?: Date;

  @Prop({type : String, default : ()=>uuid.v4() } )
  uuid: string;

}

export const CatSchema = SchemaFactory.createForClass(User);