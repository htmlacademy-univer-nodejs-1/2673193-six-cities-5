import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { LoginUserValidationMessage } from './login-user.messages.js';

export class LoginUserDto {
  @IsEmail({}, { message: LoginUserValidationMessage.email.invalidFormat })
  @IsNotEmpty({message: LoginUserValidationMessage.email.required})
  public email: string;

  @IsString({message: LoginUserValidationMessage.password.invalidFormat})
  @IsNotEmpty({message: LoginUserValidationMessage.password.required})
  public password: string;
}
