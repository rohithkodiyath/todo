import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Logger,
  NotAcceptableException,
  NotFoundException,
  Post,
  Query
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UtiltyService } from "../common/service/utilty.service";
import { AuthDto } from "./dto";
import { UserService } from "../user/user.service";
import { ResponseDto } from "../common/dto/response.dto";
import { ApiTags } from "@nestjs/swagger";


@ApiTags('authentication')
@Controller('auth')
export class AuthController {

  private logger = new Logger(AuthController.name);
  constructor( private authService: AuthService, private util : UtiltyService,
               private userService: UserService) {

     this.logger.log("ENVIRONMENT :",this.util.getConfig().env)
    // this.logger.log("APP HOST :",this.util.getConfig().dbHost)
    // this.logger.log("APP PORT :",this.util.getConfig().appPort)
  }

  @Post("signin")
  public signIn(@Body() authDto : AuthDto) {

    return this.authService.signIn(authDto)
  }



  @Get("test")
  public getSample() {
    return "this is a sample response rkp"
  }

}
