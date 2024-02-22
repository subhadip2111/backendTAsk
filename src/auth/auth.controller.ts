import {
  Body,
  Controller,
 
  Post,

} from '@nestjs/common';


import { AuthService } from './auth.service';


import {   SigninDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('user/login')
  signin(@Body() dto: SigninDto) {
    return this.authService.signIn(dto.email, dto.password);
  }



}

