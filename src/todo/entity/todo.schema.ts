
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Schema as MongooseSchema } from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { User } from "../../user/entity/user.schema";


export type TodoDocument = HydratedDocument<Todo>;

@Schema({ timestamps: true })
export class Todo extends Document {

  constructor() {
    super();
  }

  @Prop({isRequired : true})
  title: string;

  @Prop({isRequired : true})
  description: string;

  @Prop({type : MongooseSchema.Types.ObjectId, ref : "User"})
  user: User

  @Prop({type : Date})
  updatedAt?: Date;

  @Prop()
  createdAt?: Date;

  @Prop({type : String, default : ()=> uuidv4() } )
  uuid: string;

}

export const TodoSchema = SchemaFactory.createForClass(Todo);