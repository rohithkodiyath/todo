import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user/entity/user.schema";
import { Model } from "mongoose";
import { Todo } from "./entity/todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";

@Injectable()
export class TodoService {

  private logger = new Logger(TodoService.name);

  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {
  }

  public async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  public async getTodoById(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  public async getTodoByUuid(uuid: string): Promise<Todo> {
    return this.todoModel.findOne({ uuid: uuid }).exec();
  }

  public async searchTodo(word: string, limit: number): Promise<Todo[]> {
    let searchFilter = word ? {
      $or: [
        { title: { $regex: new RegExp(word, "i") } },
        { description: { $regex: new RegExp(word, "i") } }
      ]
    } : {};
    let limitFilter = limit ? limit : 10000;

    return this.todoModel.find(searchFilter).sort({
      createdAt: -1
    }).limit(limitFilter).exec();
  }

  public async saveTodo(todo: Todo): Promise<Todo> {
    return new this.todoModel(todo).save();
  }

  public async createTodo(todoDto : CreateTodoDto): Promise<Todo> {
    let toDoToSave: Todo;
    toDoToSave = new this.todoModel();
    toDoToSave.title = todoDto.title;
    toDoToSave.description = todoDto.description;
    return  this.saveTodo(toDoToSave);
  }

  public async deleteTodoByUuid(id: string): Promise<void> {
    await this.todoModel.deleteOne({ uuid: id }).exec();
  }

  //TODO : delete all by user
  public async deleteAllTodos(): Promise<void> {
    await this.todoModel.deleteMany().exec();
  }


}
