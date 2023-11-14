import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Todo App')
    .setDescription('Todo application for maintaining the list of activities')
    .setVersion('1.0')
    .addTag('todo')
    .addTag('authentication')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({
    whitelist : true,
    exceptionFactory: (errors) => {
      return new BadRequestException(
        errors.map((error) => ({
          field: error.property,
          error: Object.values(error.constraints).join(', '),
        })),
      );
    }
  }))
  await app.listen(process.env.APP_PORT,"0.0.0.0");
}
bootstrap();
