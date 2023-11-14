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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Public } from "./decorator/public.decorator";


@ApiTags('authentication')
@Controller('auth')
export class AuthController {

  private logger = new Logger(AuthController.name);
  constructor( private authService: AuthService, private util : UtiltyService,
               private userService: UserService) {

  }

  @Public()
  @ApiOperation({ summary: 'Login to application',
    description: `Returns ResponseDto.class with jwt token valid for ${process.env.JWT_EXP} seconds` })
  @ApiBody({ type: AuthDto })
  @ApiResponse({type: ResponseDto, status: HttpStatus.OK})
  @Post("login")
  public async signIn(@Body() authDto : AuthDto) {
    return await this.authService.signIn(authDto)
  }


}
