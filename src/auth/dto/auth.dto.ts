import { IsNotEmpty, Matches, MATCHES } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class AuthDto{

  @ApiProperty({
    title: "Email address",
    example: "sample@gmail.com",
    type: String,
    required: true
  })
  @IsNotEmpty({
    message : "Email can not be empty"
  })
  email : string

  @ApiProperty({
    title: "Password to login, must have atleast 8 letters containing one capital letter, small letter and a number.",
    example: "Password@123",
    type: String,
    required: true
  })
  @IsNotEmpty({
    message: "Password can not be empty"
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing atleast one capital letter etc"
  })
  password : string
}