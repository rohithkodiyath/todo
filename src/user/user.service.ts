import { Injectable, Logger, NotAcceptableException } from "@nestjs/common";
import { SignupDto } from "./dto/signup.dto";
import { PrismaService } from "../prisma/prisma.service";
import { User, UserSchema } from "./entity/user.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import  * as bcrypt  from "bcrypt";
import { Otp } from "./entity/otp.schema";
import { UserprofileDto } from "./dto/userprofile.dto";
import { ConfigService } from "../config/config.service";
import { UtiltyService } from "../common/service/utilty.service";



@Injectable()
export class UserService {

  private logger = new Logger(UserService.name)

  constructor(@InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Otp.name) private otpModel: Model<Otp>,
              utilityService : UtiltyService) {
  }

  public async getUserFromUuid(uuid:string):Promise<User> {
    return await this.userModel.findOne({
      uuid:uuid,
    }).exec();
  }

  public async comparePasswords(input:string, hashedPassword : string):Promise<boolean> {
    return await bcrypt.compare(input, hashedPassword);
  }


  public async getAllUsers():Promise<User[]>{
    return await this.userModel.find().exec();
  }

  public async updateProfile(profile :UserprofileDto): Promise<void>{
    let user = await this.getUserFromUuid(profile.uuid);
    if(user == null){
      throw new NotAcceptableException("User not found")
    }
    if(profile.password != null && profile.password != profile.confirmPassword){
      throw new NotAcceptableException("Confirm password and password mismatch")
    }
    if(profile.email != user.email){
      throw new NotAcceptableException("Email can not be modified")
    }
    if(profile.password != null){
      user.password = await this.hashPassword(profile.password);
    }
    user.firstName = profile.firstName;
    user.lastName = profile.lastName;

    //save user
    let otpModel = new this.userModel(user);
    await otpModel.save();
  }

  public async deleteOtpForUser(user : User): Promise<void>{
    await this.otpModel.deleteMany({ "user" : user }).exec();
  }


  public async  generateOtpForForgetPassword(userUuid : string, stubOtp : number  = null){
    let user = await this.getUserFromUuid(userUuid);

    if(user == null){
      throw new NotAcceptableException("User not found")
    }

    // delete if any existing otp
    await this.deleteOtpForUser(user);

    //generate otp and send to user email
    let otp = stubOtp ? stubOtp : this.generateOtp();

    let otpEntity = new Otp();
    otpEntity.otp = otp;
    otpEntity.user = user;
    let otpModel = new this.otpModel(otpEntity);
    await otpModel.save();
  }

  public async getOtpEntityForUser(user : User){
    return this.otpModel.findOne({ "user" : user }).exec();
  }

  public async registerUser(signinDto: SignupDto) {

    const u = await this.findUserByEmail(signinDto.email)
    if(u != null){
      throw new NotAcceptableException("Email id is already taken!")
    }

    //Password check
    if(signinDto.password != signinDto.confirmPassword){
      throw new NotAcceptableException("Password and confirm password mismatch !")
    }

    //Email id check
    let userWithSameEmail = await this.findUserByEmail(signinDto.email)
    if(userWithSameEmail != null){
      throw new NotAcceptableException("Email id is already taken!")
    }

    this.logger.log("SigninDto.password ", signinDto.password)
    //encrpt password
    let userEntity   = new this.userModel();
    userEntity.firstName = signinDto.firstName
    userEntity.lastName = signinDto.lastName
    userEntity.dob = signinDto.dateOfBirth
    userEntity.email = signinDto.email
    userEntity.password = await  this.hashPassword(signinDto.password);

    let user : User = await userEntity.save()
    this.logger.log("Saved file "+u)
    return user;
  }



  public async updateUser(signinDto: SignupDto) {

    let userEntity   = new User();
    userEntity.firstName = signinDto.firstName
    userEntity.lastName = signinDto.lastName
    userEntity.dob = signinDto.dateOfBirth
    userEntity.email = signinDto.email

    const u = await this.findUserByEmail(signinDto.email)
    if(u != null){
      throw new NotAcceptableException("Email id is already taken!")
    }
    if(signinDto.password != signinDto.confirmPassword){
      throw new NotAcceptableException("Password and confirm password mismatch !")
    }

    //encrpt password
    userEntity.password =  await this.hashPassword(signinDto.password);
    const createUser = new this.userModel(userEntity)
    let user : User = await createUser.save()
    this.logger.log("Saved file "+u)
  }

  public async findOtpEntityForUser(user: User) : Promise<Otp|undefined> {
    return this.otpModel.findOne({
      user: user
    });
  }

  public async findUserByEmail(mail : String):Promise<User|undefined>{
    return this.userModel.findOne({
      email: {
        $regex: mail,
        $options: "i"
      }
    });
  }

  public async saveUser(user : User):Promise<void>{
    await new this.userModel(user).save();
  }

  public async hashPassword(password : string) : Promise<string>{
    this.logger.log("Hashing password ",password)
    return await bcrypt.hash(password,10)
  }

  private generateOtp():number{
    //generate 4 digit otp
    return Math.floor(1000 + Math.random() * 9000);
  }



}
