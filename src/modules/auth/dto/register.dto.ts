import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    description: 'User Email Address',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'Provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @ApiProperty({
    description: 'User Password',
    example: 'StrongP@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty({ message: 'password required!' })
  @MinLength(8, { message: 'password must be at least 8 characters!' })
  password: string;

  @ApiProperty({
    description: 'User First Name',
    example: 'John',
    required: false,
  })
  @IsOptional()
  @IsString()
  firstName: string;

  @ApiProperty({
    description: 'User Last Name',
    example: 'Doe',
    required: false,
  })
  @IsOptional()
  @IsString()
  lastName: string;
}
