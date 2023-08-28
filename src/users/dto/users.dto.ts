/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmpass: string;

  @IsNotEmpty()
  apply: string;
}

export class SignUpEmployeeDto {
  @IsNotEmpty()
  user_name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmpass: string;
}

export class PhoneDto {
  @IsNotEmpty()
  @IsNumberString()
  phone: string;
}
