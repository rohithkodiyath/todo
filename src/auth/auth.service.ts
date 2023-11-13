import { Injectable } from '@nestjs/common';
import { AuthDto, SignupDto } from "./dto";

@Injectable()
export class AuthService {

  public signIn(authDto: AuthDto){
    return "I have sign in"
  }

  public signUp(signUpDto : SignupDto){
    return  "SIgnin"
  }


}
