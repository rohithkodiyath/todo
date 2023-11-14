import { Body, Controller, Delete, Get, Logger, NotFoundException, Param, Post, Put, Query } from "@nestjs/common";
import { TodoService } from "./todo.service";
import { TodoDto } from "./dto/todo.dto";
import { CreateTodoDto } from "./dto/create-todo.dto";
import { ResponseDto } from "../common/dto/response.dto";
import { Todo } from "./entity/todo.schema";
import { UpdateTodoDto } from "./dto/update-todo.dto";
import { User } from "../user/entity/user.schema";
import { ApiBody, ApiOperation, ApiParam, ApiQuery, ApiTags } from "@nestjs/swagger";

@ApiTags('todo')
@Controller("todo")
export class TodoController {

  private logger = new Logger(TodoController.name);

  constructor(private todoService: TodoService) {
  }

  //get all todos
  @Get()
  @ApiOperation({ summary: 'Get all todos',
    description: 'Returns list of todos created by the logged in user',
    security: [{ bearerAuth: [] }],
  })
  @ApiQuery({ name: 'q', description: 'Search keyword. Search todo by Title and description', required: false, type: String })
  @ApiQuery({ name: 'limit', description: 'The number to limit the response', required: false , type: Number})
  public async getAllTodos(@Query("q") search: string = null, @Query("limit") limit: number = null) {
    //return 'get all todos';
    let todos = await this.todoService.searchTodo(search, limit);
    return todos.map(todo => TodoDto.from(todo));
  }

  // get todo by id
  @ApiOperation({ summary: 'Get todo by uuid',
    description: 'Returns todo for the given uuid',
    security: [{ bearerAuth: [] }],
  })
  @ApiParam({ name: 'id', description: 'The UUID of the todo' })
  @Get("/:id")
  public async getTodoById(@Param("id") uuid: string) {
    let todo = await this.todoService.getTodoByUuid(uuid);
    if (!todo) {
      throw new NotFoundException(`Todo not found for the :id ${uuid}`);
    }
    return TodoDto.from(todo);
  }


  // create todo
  @ApiOperation({ summary: 'Create todo',
    description: 'Create todo for the logged in user',
    security: [{ bearerAuth: [] }],
  })
  @ApiBody({ type: CreateTodoDto })
  @Post()
  public async create(@Body() createTodo: CreateTodoDto) {

    let todo = await this.todoService.createTodo(createTodo);
    return ResponseDto.from("Success");
  }

  // update todo
  @Put("/:id")
  @ApiOperation({ summary: 'Update todo',
    description: 'Update todo for the logged in user',
    security: [{ bearerAuth: [] }],
  })
  @ApiParam({ name: 'id', description: 'The UUID of the todo' })
  @ApiBody({ type: UpdateTodoDto })
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
  @ApiOperation({ summary: 'Delete todo',
    description: 'Delete todo with todo UUID',
    security: [{ bearerAuth: [] }],
  })
  @ApiParam({ name: 'id', description: 'The UUID of the todo' })
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
