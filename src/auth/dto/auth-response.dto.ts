import { IsNotEmpty, Matches, MATCHES } from "class-validator";
import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";

export class AuthResponseDto{

  @ApiProperty({
    title: `JWT token valid for ${process.env.JWT_EXP} seconds`,
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjA0NDYzNDQtNTdjMy00MDg3LTk0ZTItYjdlMThhNWU5OWYyIiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJSb2hpdGgiLCJsYXN0TmFtZSI6IktvZGl5YXRoIiwiaWF0IjoxNjk5ODk2NTUzLCJleHAiOjE2OTk4OTgzNTMsInN1YiI6InVzZXIxQGdtYWlsLmNvbSJ9.CtVZSsxWpmCdGkb7aElLZuL1RFcqZenkc1rXJBmtUzc",
    type: String
  })
  token : string

  @ApiHideProperty()
  @ApiProperty({
    title: `JWT  refresh token valid for ${process.env.JWT_REFRESH_EXP} seconds`,
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1dWlkIjoiYjA0NDYzNDQtNTdjMy00MDg3LTk0ZTItYjdlMThhNWU5OWYyIiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJmaXJzdE5hbWUiOiJSb2hpdGgiLCJsYXN0TmFtZSI6IktvZGl5YXRoIiwiaWF0IjoxNjk5ODk2NTUzLCJleHAiOjE2OTk4OTgzNTMsInN1YiI6InVzZXIxQGdtYWlsLmNvbSJ9.CtVZSsxWpmCdGkb7aElLZuL1RFcqZenkc1rXJBmtUzc",
    type: String,
  })
  refreshToken : string

}