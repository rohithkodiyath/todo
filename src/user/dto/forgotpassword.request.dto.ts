import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ForgotPasswordRequestDto {

  @ApiProperty({
    title: "Email address",
    example: "sample@gmail.com",
    required: true,
    type: String
  })
  @IsEmail()
  email : string

}