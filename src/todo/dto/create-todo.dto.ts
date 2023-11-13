import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class CreateTodoDto {

  @IsNotEmpty()
  title : string

  @IsNotEmpty()
  description : string

}