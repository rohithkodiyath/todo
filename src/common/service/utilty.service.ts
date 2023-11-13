import { Injectable } from '@nestjs/common';
import { ModelConfig } from '../../config/model.config'
import { ConfigService } from "../../config/config.service";

@Injectable()
export class UtiltyService {

  constructor(private configService : ConfigService) {
  }

  public getConfig() : ModelConfig {
    return this.configService.getConfig();
  }




}
