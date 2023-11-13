import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class TodoDto {

  @IsNotEmpty()
  title : string

  @IsNotEmpty()
  description : string

  uuid : string


  public static from(dto: Partial<TodoDto>) : TodoDto{
    const it = new TodoDto();
    it.title = dto.title;
    it.description = dto.description;
    it.uuid = dto.uuid;
    return it;
  }

}