import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {


  private logger = new Logger(HttpExceptionFilter.name);
  catch(exception: HttpException, host: ArgumentsHost) {

    //this.logger.error(exception.message,exception.stack);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();



    response
      .status(status)
      .json({
        statusCode: status,
        message: exception.message,
        detail : exception.getResponse() ? exception.getResponse()["message"]:null,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}