import { registerAs } from "@nestjs/config";
import * as process from "process";

export enum AppEnv {
  prod = 'production',
  dev = 'development',
  stage = 'staging'
}

export interface ModelConfig {
  databaseUrl : string,
  env : AppEnv,
  appPort : number,
  otpExpiry : number,
  jwtTokenExpiry : number,
  jwtRefreshTokenExpiry : number,
  jwtSecret : string
}

export const customAppConfig = registerAs('app', () : ModelConfig => ({
  databaseUrl : process.env.DATABASE_URL || '',
  env : AppEnv[process.env.ENV] || 'development',
  appPort : parseInt(process.env.APP_PORT) || 3000,
  otpExpiry : parseInt(process.env.OTP_EXPIRY) || 60,
  jwtTokenExpiry : parseInt(process.env.JWT_EXP) || 1800,
  jwtRefreshTokenExpiry : parseInt(process.env.JWT_REFRESH_EXP) || 7200,
  jwtSecret : AppEnv[process.env.JWT_SECRET] || 'npWjcuqSVfPGyn7'
}))