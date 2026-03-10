import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({
    description: 'New Password of the user',
    example: 'NewP@ssw0rd',
  })
  @IsString()
  @IsNotEmpty({ message: 'New Password must not be empty' })
  currentPassword: string;

  @ApiProperty({
    description: 'New password for the user',
    example: 'NewP@ssw0rd',
    minLength: 8,
  })
  @IsString()
  @IsNotEmpty({ message: 'new password must not be empty.' })
  @MinLength(8, { message: 'New password must be at least 8 character' })
  newPassword: string;
}
