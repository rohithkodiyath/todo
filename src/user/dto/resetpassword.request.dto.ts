import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class ResetPasswordRequestDto{

  @ApiProperty({
    title: "Four digit OTP sent to the email address",
    example: "1234",
    required: true,
    type: Number
  })
  @IsNotEmpty()
  otp : number

  @ApiProperty({
    title: "New password. Must have atleast 8 letters containing one capital letter, small letter and number.",
    example: "Password@123",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing atleast one capital letter etc"
  })
  password : string

  @ApiProperty({
    title: "Confirm New password. Must have atleast 8 letters containing one capital letter, small letter and a number.",
    example: "Password@123",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Confirm New password. Must have atleast 8 letters containing one capital letter, small letter and a number"
  })
  confirmPassword : string

  @ApiProperty({
    title: "Email address",
    example: "sample@gmail.com",
    required: true,
    type: String
  })
  @IsEmail()
  email : string
}