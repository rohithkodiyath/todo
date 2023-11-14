import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../user/entity/user.schema";
import { Model } from "mongoose";
import { Todo } from "./entity/todo.schema";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { UserService } from "../user/user.service";

@Injectable()
export class TodoService {

  private logger = new Logger(TodoService.name);

  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>,
              private userService: UserService) {
  }

  public async getAllTodos(): Promise<Todo[]> {
    return this.todoModel.find().exec();
  }

  public async getTodoById(id: string): Promise<Todo> {
    return this.todoModel.findById(id).exec();
  }

  public async getTodoByUuid(uuid: string, userUuid?:string): Promise<Todo> {
    let filter = { uuid: uuid };
    if(userUuid){
      let userWithUuid = await this.userService.getUserFromUuid(userUuid);
      filter['user'] = userWithUuid;
    }
    return this.todoModel.findOne(filter).exec();
  }

  public async searchTodo(word: string, limit: number, userUuid : string): Promise<Todo[]> {
    const user = await this.userService.getUserFromUuid(userUuid);
    let searchFilter = word ? {
      $or: [
        { title: { $regex: new RegExp(word, "i") } },
        { description: { $regex: new RegExp(word, "i") } }
      ],
      $and: [
        { user: user }
      ]
    } : {
      user: user
    };
    let limitFilter = limit ? limit : 10000;

    return this.todoModel.find(searchFilter).sort({
      createdAt: -1
    }).limit(limitFilter).exec();
  }

  public async saveTodo(todo: Todo): Promise<Todo> {
    return new this.todoModel(todo).save();
  }

  public async createTodo(todoDto: CreateTodoDto, userUuid : string): Promise<Todo> {
    const user = await this.userService.getUserFromUuid(userUuid);
    let toDoToSave: Todo;
    toDoToSave = new this.todoModel();
    toDoToSave.title = todoDto.title;
    toDoToSave.user = user;
    toDoToSave.description = todoDto.description;
    return this.saveTodo(toDoToSave);
  }

  public async deleteTodoByUuid(id: string): Promise<void> {
    await this.todoModel.deleteOne({ uuid: id }).exec();
  }

  //TODO : delete all by user
  public async deleteAllTodos(): Promise<void> {
    await this.todoModel.deleteMany().exec();
  }


}
