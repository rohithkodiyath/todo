import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class TodoDto {

  @IsNotEmpty()
  title : string

  @IsNotEmpty()
  description : string

  uuid : string
}