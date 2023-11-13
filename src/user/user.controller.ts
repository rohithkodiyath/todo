import {
  Body,
  Controller,
  HttpStatus, Logger,
  NotAcceptableException,
  NotFoundException,
  Post,
  PreconditionFailedException,
  Query
} from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { UserService } from "./user.service";
import { ResponseDto } from "../common/dto/response.dto";
import { ResetPasswordRequestDto } from "./dto/resetpassword.request.dto";
import { ForgotPasswordRequestDto } from "./dto/forgotpassword.request.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('user')
@Controller('user')
export class UserController {

  private logger = new Logger(UserController.name);

  constructor(private userService :UserService) {
  }


  @ApiOperation({ summary: 'Register user to application',
    description: 'Returns ResponseDto.class with user uuid' })
  @Post("register")
  public async signUp(@Body() signupDto : SignupDto ){
    let user =  await this.userService.registerUser(signupDto)
    return ResponseDto.from("Success" , HttpStatus.CREATED, {
      uuid:user.uuid
    });
  }

  @ApiOperation({ summary: 'Forgot password',
    description: 'Returns JWT valid for 1 hr',

    })
  @ApiTags('authentication')
  @Post("/forgotpassword")
  public async forgetPassword(@Body() forgotPasswordRequestDto : ForgotPasswordRequestDto) :Promise<ResponseDto>{
    let userWithMailId = await this.userService.findUserByEmail(forgotPasswordRequestDto.email);
    if(!userWithMailId){
        throw new NotFoundException("User not found exception!")
    }

    await this.userService.generateOtpForForgetPassword(userWithMailId.uuid);

    let responseDto = new ResponseDto();
    responseDto.statusCode = HttpStatus.ACCEPTED
    responseDto.message = "Otp generated successfully and sent to your mail id";
    return responseDto;
  }

  @ApiTags('authentication')
  @Post("resetpassword")
  public async resendPassword(@Body() resetPasswordRequestDto : ResetPasswordRequestDto):Promise<ResponseDto>{
    let userWithMailId = await this.userService.findUserByEmail(resetPasswordRequestDto.email);
    if(userWithMailId){
      throw new NotFoundException("User not found exception!")
    }
    // if otp is not found then throw exception
    let otp = await  this.userService.findOtpEntityForUser(userWithMailId);
    if(!otp){
      throw new NotAcceptableException("Reset password has been not initiated for this user")
    }

    if(resetPasswordRequestDto.password != resetPasswordRequestDto.confirmPassword){
      throw new NotAcceptableException("Password and confirm password mismatch")
    }
    // if otp mismatch throw exception
    if(otp.otp == resetPasswordRequestDto.otp){
      throw new NotAcceptableException("Otp mismatch")
    }

    // if otp match then encrypt update password and save user with profile update
    userWithMailId.password = await this.userService.hashPassword(resetPasswordRequestDto.password);


    let user = await this.userService.saveUser(userWithMailId);
    // if success throw success message
    let responseDto = new ResponseDto();
    responseDto.statusCode = HttpStatus.ACCEPTED
    return responseDto;
  }


}
