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
import { Public } from "../auth/decorator/public.decorator";
import { UtiltyService } from "../common/service/utilty.service";

@ApiTags('user')
@Controller('user')
@Public()
export class UserController {

  private logger = new Logger(UserController.name);

  constructor(private userService :UserService, private util : UtiltyService){
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

  @ApiOperation({ summary: 'Initiate password reset',
    description: 'Initiate password reset, send OTP to user mail id'})
  @ApiTags('authentication')
  @Post("/initiatepasswordreset")
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

  @ApiOperation({ summary: 'Stub end-point to initiate password reset',
    description: 'Initiate a stub otp 1234 and save it to db with out sending to user mail id'})
  @ApiTags('authentication')
  @Post("/initiatepasswordreset/stub")
  public async initiateForgetPassword(@Body() forgotPasswordRequestDto : ForgotPasswordRequestDto) :Promise<ResponseDto>{
    let userWithMailId = await this.userService.findUserByEmail(forgotPasswordRequestDto.email);
    if(!userWithMailId){
      throw new NotFoundException("User not found exception!")
    }
    await this.userService.generateOtpForForgetPassword(userWithMailId.uuid,1234);
    let responseDto = new ResponseDto();
    responseDto.statusCode = HttpStatus.ACCEPTED
    responseDto.message = "Otp generated successfully and sent to your mail id";
    return responseDto;
  }

  @ApiOperation({ summary: 'Reset password with OTP',
    description: 'Reset password with OTP, sent to user mail id.'
  })
  @ApiTags('authentication')
  @Post("resetpassword")
  public async resendPassword(@Body() resetPasswordRequestDto : ResetPasswordRequestDto):Promise<ResponseDto>{
    let userWithMailId = await this.userService.findUserByEmail(resetPasswordRequestDto.email);
    if(!userWithMailId){
      throw new NotFoundException("User not found exception!")
    }
    // if otp is not found then throw exception
    let otp = await  this.userService.findOtpEntityForUser(userWithMailId);
    if(!otp){
      throw new NotAcceptableException("OTP is not generated / OTP Expired")
    }
    let otpExpInSeconds = this.util.getConfig().otpExpiry;
    let expiryTime = otp.createdAt.getTime() + (1000 * otpExpInSeconds);
    let currentTime = new Date().getTime();
    this.logger.log(`Otp created time  ${ otp.createdAt.getTime() } , added time  ${expiryTime} current Time ${currentTime}` )
    if(expiryTime < currentTime){
      throw new NotAcceptableException("Otp expired")
    }
    if(resetPasswordRequestDto.password != resetPasswordRequestDto.confirmPassword){
      throw new NotAcceptableException("Password and confirm password mismatch")
    }

    // if otp mismatch throw exception
    if(otp.otp != resetPasswordRequestDto.otp){
      throw new NotAcceptableException("Otp mismatch")
    }
    // delete otp
    await this.userService.deleteOtpForUser(userWithMailId);

    // if otp match then encrypt update password and save user with profile update
    userWithMailId.password = await this.userService.hashPassword(resetPasswordRequestDto.password);


    let user = await this.userService.saveUser(userWithMailId);
    // if success throw success message
    let responseDto = new ResponseDto();
    responseDto.statusCode = HttpStatus.ACCEPTED
    return responseDto;
  }


}
