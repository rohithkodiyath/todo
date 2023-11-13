import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./entity/user.schema";
import { Otp, OtpSchema } from "./entity/otp.schema";
import { CommonModule } from "../common/common.module";

@Module({
  imports : [CommonModule, MongooseModule.forFeature([{name:User.name,schema:UserSchema},
    {name:Otp.name,schema:OtpSchema}])],
  providers: [UserService],
  controllers: [UserController],
  exports : [UserService]
})
export class UserModule {}
