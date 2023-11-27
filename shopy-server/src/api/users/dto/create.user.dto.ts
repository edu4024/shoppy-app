import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
} from 'class-validator';
import { constants } from '../../../contants/constants';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(constants.USER_PASS_MIN_LENGTH)
  password: string;

  @IsString()
  @MinLength(constants.USER_NAME_MIN_LENGTH)
  firstName: string;

  @IsString()
  @MinLength(constants.USER_NAME_MIN_LENGTH)
  lastName: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserDto extends CreateUserDto {
  _id: string;
}
