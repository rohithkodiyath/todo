import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class CreateTodoDto {

  @ApiProperty({
    title: `Title of the todo`,
    example: "Buy milk",
    type: String
  })
  @IsNotEmpty()
  title : string

  @ApiProperty({
    title: `Description of the todo`,
    example: "Buy 2L packets of milk from the store.",
    type: String
  })
  @IsNotEmpty()
  description : string

}