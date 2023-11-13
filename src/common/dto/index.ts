import { HttpStatus } from "@nestjs/common";

class ResponseDto {

  message: any;

  statusCode: HttpStatus;
  
}