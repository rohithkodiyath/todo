import { Module, Logger } from '@nestjs/common';
import { AuthenticationModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TodoModule } from './todo/todo.module';
//import { ConfigModule } from './config/config.module';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { CommonModule } from './common/common.module';
import * as process from "process";
import { UtiltyService } from "./common/service/utilty.service";
import { PrismaModule } from './prisma/prisma.module';
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    AuthenticationModule,
    UserModule,
    TodoModule,
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {

  private logger  = new Logger(AppModule.name)

}
