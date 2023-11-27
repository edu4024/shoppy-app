import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ResponseLoginDto } from './dto/login.dto';
import { UserInterface } from '../users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(userEmail: string, password: string): Promise<ResponseLoginDto> {
    const { email, _id } = await this.validateUser(userEmail, password);
    const payload = { email, sub: _id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(email: string, pass: string): Promise<UserInterface> {
    const [user] = await this.usersService.find({ email: email });
    if (!user) throw new UnauthorizedException();
    const isPassCorrect = await compare(pass, user.password);
    if (!isPassCorrect) throw new UnauthorizedException();
    return user;
  }

  async signIn(data): Promise<ResponseLoginDto> {
    const { email, _id } = await this.usersService.create(data);
    const payload = { email, sub: _id };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
