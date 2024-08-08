import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;
  // obrigatorio colocar todas as validações

  @IsString()
  @MinLength(6)
  password: string;
  // @IsStrongPassword({
  //   minLength: 6,
  //   minLowercase: 0,
  //   minNumbers: 0,
  //   minSymbols: 0,
  //   minUppercase: 0,
  // })
  // password: string;

  @IsOptional()
  @IsDateString()
  birth_at: Date;

  @IsOptional()
  @IsEnum(Role)
  role: number;
}
