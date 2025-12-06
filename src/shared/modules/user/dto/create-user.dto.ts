import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsOptional,
  IsEnum,
  IsUrl
} from 'class-validator';
import { UserType } from '../../../types/index.js';
import { CreateUserValidationMessage } from './create-user.messages.js';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: CreateUserValidationMessage.name.required })
  @MinLength(1, { message: CreateUserValidationMessage.name.minLength })
  @MaxLength(15, { message: CreateUserValidationMessage.name.maxLength })
  public name: string;

  @IsEmail({}, { message: CreateUserValidationMessage.email.invalid })
  @IsNotEmpty({ message: CreateUserValidationMessage.email.required })
  public email: string;

  @IsOptional()
  @IsUrl({}, { message: CreateUserValidationMessage.avatar.invalidFormat })
  public avatar: string;

  @IsString()
  @IsNotEmpty({ message: CreateUserValidationMessage.password.required })
  @MinLength(6, { message: CreateUserValidationMessage.password.minLength })
  @MaxLength(12, { message: CreateUserValidationMessage.password.maxLength })
  public password: string;

  @IsEnum(UserType, { message: CreateUserValidationMessage.type.invalid })
  @IsNotEmpty({ message: CreateUserValidationMessage.type.required })
  public type: UserType;
}
