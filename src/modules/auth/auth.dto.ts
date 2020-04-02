import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AuthDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
