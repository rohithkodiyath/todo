import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { UserController } from "../user/user.controller";
import { CommonModule } from "../common/common.module";
import { UtiltyService } from "../common/service/utilty.service";
import { UserModule } from "../user/user.module";

@Module({
  controllers: [UserController, AuthController],
  providers: [AuthService],
  imports: [CommonModule, UserModule]
})
export class AuthenticationModule {
}
