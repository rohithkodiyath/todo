import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class UserprofileDto {

  @ApiProperty({
    title: "Change Password",
    description:"Incase user wants to change password provide new password and confirm password",
    example: "Password@123",
    type: String,
    required: false
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing at least one capital letter etc"
  })
  password : string


  @ApiProperty({
    title: "Confirm Password",
    description:"Incase user wants to change password provide new password and confirm password",
    example: "Password@123",
    type: String,
    required: false
  })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/,{
    message : "Password must have 8 letters containing at least one capital letter etc"
  })
  confirmPassword : string

  @ApiProperty({
    title: "First name",
    example: "John",
    type: String,
    required: false
  })
  @IsNotEmpty()
  firstName : string

  @ApiProperty({
    title: "Last name",
    example: "Honas",
    type: String,
    required: false
  })
  @IsNotEmpty()
  lastName : string

  @IsEmail()
  @ApiProperty({
    title: "Email address",
    example: "sample@gmail.com",
    type: String,
    required: false
  })
  email : string

  @ApiProperty({
    title: "UUID of the user",
    example: "11b8ec77-a5b8-44d7-bc61-191e00c52349",
    required: true,
    type: String
  })
  @IsNotEmpty()
  uuid : string


}