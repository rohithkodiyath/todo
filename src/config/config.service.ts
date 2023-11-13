import { Module, Logger } from '@nestjs/common';
import { ConfigModule as ConfMod } from "@nestjs/config" ;
import { customAppConfig } from "./model.config";
import * as process from "process";

@Module({
  imports : [ConfMod.forRoot({
    load: [customAppConfig],
    isGlobal : true,
    ignoreEnvFile : true
  })],
  providers: []
})
export class ConfigModule {

  constructor() {

  }

}
