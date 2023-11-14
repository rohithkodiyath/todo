import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class TodoDto {

  @ApiProperty({
    title: `Title of the todo`,
    example: "Buy milk",
    type: String,
    required: true
  })
  @IsNotEmpty()
  title : string

  @ApiProperty({
    title: `Description of the todo`,
    example: "Buy 2L packets of milk from the store.",
    type: String,
    required: true
  })
  @IsNotEmpty()
  description : string

  @ApiProperty({
    title: `UUID of the todo`,
    type: String,
    required: true
  })
  uuid : string


  public static from(dto: Partial<TodoDto>) : TodoDto{
    const it = new TodoDto();
    it.title = dto.title;
    it.description = dto.description;
    it.uuid = dto.uuid;
    return it;
  }

}