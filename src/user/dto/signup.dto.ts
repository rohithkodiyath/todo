import { IsDate, IsEmail, IsNotEmpty, Matches } from "class-validator";
import { Optional } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

export class SignupDto {

  @ApiProperty({
    title: "Password",
    example: "Password@123",
    description: "Password must have at lest 8 letters and should contain at least one Capital letter, small letter  ",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/, {
    message: "Password must have 8 letters containing atleast one capital letter etc"
  })
  password: string;

  @ApiProperty({
    title: "Confirm Password",
    example: "Password@123",
    description: "Password must have at lest 8 letters and should contain at least one Capital letter, small letter  ",
    required: true,
    type: String
  })
  @IsNotEmpty()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/, {
    message: "Password must have 8 letters containing atleast one capital letter etc"
  })
  confirmPassword: string;

  @ApiProperty({
    title: "First name",
    example: "John",
    required: true,
    type: String
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    title: "Last name",
    example: "Honas",
    required: true,
    type: String
  })
  @IsNotEmpty()
  lastName: string;

  // @IsDate()
  // @Optional()
  dateOfBirth: Date | null;

  @ApiProperty({
    title: "Email address",
    example: "testmail@gmail.com",
    description : "This is the email address of the user",
    required: true,
    type: String
  })
  @IsEmail()
  email: string;
}