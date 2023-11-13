import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { CommonModule } from "../common/common.module";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "../user/entity/user.schema";
import { Todo, TodoSchema } from "./entity/todo.schema";

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      {name : Todo.name, schema : TodoSchema},
    ])
  ],
  providers: [TodoService],
  controllers: [TodoController]
})
export class TodoModule {}
