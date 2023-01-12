import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsBoolean,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'sandi sunandar',
    description: 'Fullname of the user',
  })
  @IsString()
  readonly fullname: string;

  @ApiProperty({
    example: 'sample@sample.com',
    description: 'Email of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '081234567890',
    description: 'Phone number of the user',
  })
  @IsString()
  @IsNotEmpty()
  readonly phone: string;

  @ApiProperty({
    example: 'user123',
    description: 'Username of the user',
  })
  @IsNotEmpty()
  @IsString()
  @IsLowercase()
  username: string;

  @ApiProperty({
    example: 'User123',
    description: 'Password user using Uppercase lowercase and number',
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Matches(/((?=.*\d))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

/**
 * TODO: confirm password was disables
 */

  // @ApiProperty({
  //   example: 'User123',
  //   description: 'Confirmation of password user',
  // })
  // @IsString()
  // @MinLength(6)
  // @MaxLength(20)
  // @Matches('password')
  // password_confirm: string;

  @ApiProperty({
    example: 'false',
    description: 'indentifier user is admin',
  })
  @IsBoolean()
  is_admin?: boolean = false;

  @ApiProperty({
    example: 'false',
    description: 'indentifier user is user has actived',
  })
  @IsBoolean()
  is_active?: boolean = false;
}
