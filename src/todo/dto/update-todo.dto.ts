import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class UpdateTodoDto {

  @IsNotEmpty()
  title : string

  @IsNotEmpty()
  description : string



}