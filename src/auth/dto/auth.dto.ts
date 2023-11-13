import { IsNotEmpty, Matches, MATCHES } from "class-validator";

export class AuthDto{

  @IsNotEmpty({
    message : "Username can not be empty"
  })
  userName : string

  @IsNotEmpty({
    message: "Password can not be empty"
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing atleast one capital letter etc"
  })
  password : string
}