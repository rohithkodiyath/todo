import { Module, Logger, Injectable } from "@nestjs/common";
import { ConfigModule as ConfMod , ConfigService as ConfService} from "@nestjs/config" ;
import { customAppConfig, ModelConfig } from "./model.config";
import * as process from "process";

@Injectable()
export class ConfigService {

  constructor(private configService : ConfService) {}

  public getConfig() : ModelConfig  {
    return this.configService.get<ModelConfig>('app')
  }

}
