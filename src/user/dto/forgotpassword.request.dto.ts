import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class ForgotPasswordRequestDto {

  @IsEmail()
  email : string

}