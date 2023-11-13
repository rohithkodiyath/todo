import { HttpStatus } from "@nestjs/common";

export class ResponseDto{

  message: any;
  statusCode: HttpStatus;
  info : any;

  public static from(message : any , statusCode = HttpStatus.ACCEPTED , info ?:any ) : ResponseDto{
    const it = new ResponseDto();
    it.message = message;
    it.statusCode = statusCode;
    it.info = info;
    return it;
  }
}