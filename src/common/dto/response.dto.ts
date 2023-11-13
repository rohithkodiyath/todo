import { HttpStatus } from "@nestjs/common";

export class ResponseDto{
  message: any;
  statusCode: HttpStatus;
}