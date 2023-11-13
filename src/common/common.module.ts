import { Module } from '@nestjs/common';
import { UtiltyService } from './service/utilty.service';
import { ConfigModule } from "../config/config.module";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./filter/http.exception.filter";


@Module({
  providers: [UtiltyService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    }
  ],
  imports : [ConfigModule],
  exports : [UtiltyService]
})
export class CommonModule {}
