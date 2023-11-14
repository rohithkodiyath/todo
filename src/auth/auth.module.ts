import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserController } from "../user/user.controller";
import { CommonModule } from "../common/common.module";
import { UtiltyService } from "../common/service/utilty.service";
import { UserModule } from "../user/user.module";
import { JwtService } from "@nestjs/jwt";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./guard/auth.guard";

@Module({
  controllers: [UserController, AuthController],
  providers: [AuthService, JwtService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }],
  imports: [CommonModule, UserModule]
})
export class AuthenticationModule {
}
