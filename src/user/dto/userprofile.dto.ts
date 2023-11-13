import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class UserprofileDto {

  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing at least one capital letter etc"
  })
  password : string


  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing at least one capital letter etc"
  })
  confirmPassword : string

  @IsNotEmpty()
  firstName : string

  @IsNotEmpty()
  lastName : string

  @IsEmail()
  email : string

  @IsNotEmpty()
  uuid : string


}