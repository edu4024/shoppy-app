import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { constants } from '../../../contants/constants';

export class LoginDto {
  @ApiProperty({
    default: constants.SWAGGER_USER_EMAIL_DEFAULT,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    default: constants.SWAGGER_USER_PASS_DEFAULT,
  })
  @IsNotEmpty()
  @MinLength(constants.USER_PASS_MIN_LENGTH)
  password: string;
}

export class SignInDto extends LoginDto {
  @ApiProperty({
    default: constants.SWAGGER_USER_FIRSTNAME_DEFAULT,
  })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    default: constants.SWAGGER_USER_LASTNAME_DEFAULT,
  })
  @IsNotEmpty()
  lastName: string;
}

export class ResponseLoginDto {
  token: string;
}
