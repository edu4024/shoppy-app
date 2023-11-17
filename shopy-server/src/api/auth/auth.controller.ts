import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from '../../decorators/isPublic.decorator';
import { LoginDto, SignInDto } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
@Public()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() signInDto: LoginDto) {
    try {
      return this.authService.login(signInDto.email, signInDto.password);
    } catch (err) {
      throw new Error(`Get error: ${err.message}.`);
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      return this.authService.signIn(signInDto);
    } catch (err) {
      throw new Error(`Get error: ${err.message}.`);
    }
  }
}
