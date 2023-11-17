import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(1)
  firstName: string;

  @IsString()
  @MinLength(1)
  lastName: string;

  @IsBoolean()
  isAdmin: boolean;
}

export class UserDto extends CreateUserDto {
  _id: string;
}
