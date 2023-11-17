import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    default: 'test@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: 123456,
  })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}

export class SignInDto extends LoginDto {
  @ApiProperty({
    default: 'firstName',
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    default: 'lastName',
  })
  @IsNotEmpty()
  lastName: string;
}

export class ResponseLoginDto {
  token: string;
}
