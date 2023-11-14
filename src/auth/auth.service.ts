import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthDto, SignupDto } from "./dto";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { UtiltyService } from "../common/service/utilty.service";
import { AuthResponseDto } from "./dto/auth-response.dto";
import { Payload } from "./model/payload.model";

@Injectable()
export class AuthService {

  private logger = new Logger(AuthService.name);

  constructor(private userService: UserService,
              private jwtService: JwtService,
              private util : UtiltyService){
  }

  public async signIn(authDto: AuthDto) {
    let user = await this.userService.findUserByEmail(authDto.email);
    if (!user || !await this.userService.comparePasswords(authDto.password, user.password)) {
      throw new UnauthorizedException("Password or email is incorrect");
    }

    let payload : Payload = {
      uuid: user.uuid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    }

    let jwt =  await  this.jwtService.signAsync(payload,{
      expiresIn: this.util.getConfig().jwtTokenExpiry,
      subject : user.email,
      secret : this.util.getConfig().jwtSecret
    });

    let ret = new AuthResponseDto()
    ret.token = jwt;
    return ret;
  }

  public async verifyJwt(jwt : string): Promise<Payload> {
    return  await  this.jwtService.verify(jwt,{
      secret : this.util.getConfig().jwtSecret
    });
  }



}
