import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";

export class SignupDto {

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing atleast one capital letter etc"
  })
  password : string

  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing atleast one capital letter etc"
  })
  confirmPassword : string

  @IsNotEmpty()
  firstName : string

  @IsNotEmpty()
  lastName : string

  // @IsDate()
  // @Optional()
  dateOfBirth : Date | null

  @IsEmail()
  email : string
}