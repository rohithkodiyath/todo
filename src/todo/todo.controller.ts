import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoDto } from "./dto/todo.dto";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { ResponseDto } from "../common/dto/response.dto";
import { Todo } from "./entity/todo.schema";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { User } from "../user/entity/user.schema";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('todo')
@Controller("todo")
export class TodoController {

  private logger = new Logger(TodoController.name);

  constructor(private todoService: TodoService) {
  }

  //get all todos
  @Get()
  public async getAllTodos(@Query("q") search: string = null, @Query("limit") limit: number = null) {
    //return 'get all todos';
    let todos = await this.todoService.searchTodo(search, limit);
    return todos.map(todo => TodoDto.from(todo));
  }

  // get todo by id
  @Get("/:id")
  public async getTodoById(@Param("id") uuid: string) {
    let todo = await this.todoService.getTodoByUuid(uuid);
    if (!todo) {
      throw new NotFoundException(`Todo not found for the :id ${uuid}`);
    }
    return TodoDto.from(todo);
  }


  // create todo
  @Post()
  public async create(@Body() createTodo: CreateTodoDto) {

    let todo = await this.todoService.createTodo(createTodo);
    return ResponseDto.from("Success");
  }

  // update todo
  @Put("/:id")
  public async update(@Body() updateTodo: UpdateTodoDto, @Param("id") uuid: string) {
    let todo = await this.todoService.getTodoByUuid(uuid);
    if (!todo) {
      throw new NotFoundException(`Todo not found for the :id ${uuid}`);
    }
    Object.assign(todo, updateTodo);
    await this.todoService.saveTodo(todo);
    return ResponseDto.from("Success");
  }

  // delete todo
  @Delete("/:id")
  public async delete(@Param("id") uuid: string) {
    let todo = await this.todoService.getTodoByUuid(uuid);
    if (!todo) {
      throw new NotFoundException(`Todo not found for the :id ${uuid}`);
    }
    await this.todoService.deleteTodoByUuid(uuid);
    return ResponseDto.from("Success");
  }

}
