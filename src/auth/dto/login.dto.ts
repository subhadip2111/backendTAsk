import { Type } from 'class-transformer';
import {
  IsMobilePhone,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
  isMobilePhone,
} from 'class-validator';

export class MobLoginDto {
  @IsNotEmpty()
  loginId: string;

  @IsNotEmpty()
  deviceId: string;
}

export class WebLoginDto {
  @IsNotEmpty()
  loginId: string;
}

export class OtpDto {
  @IsNotEmpty()
  loginId: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  otp: number;
}

export class SigninDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}

export class StaffLoinDto {
  @IsNotEmpty()
  loginId: string;

  @IsNotEmpty()
  password: string;
}
