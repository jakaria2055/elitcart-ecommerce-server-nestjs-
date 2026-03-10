import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class AuthResponseDto {
  @ApiProperty({
    description: 'Accesstoken for Authentication',
    example:
      '28478ef20dbe9551a877bffd796ea7d4414256348626511a9158f65bbd478621f15ecbd04aca89dd61693f9317d04e8bf6f',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Refresh token for obtaining new access token',
    example:
      '28478ef20dbe9551a877bffd796ea7d4414256348626511a9158f65bbd478621f15ecbd04aca89dd61693f9317d04e8bf6f',
  })
  refreshToken: string;

  @ApiProperty({
    description: 'Authenticated User Information',
    example: {
      id: 'user-123',
      email: '<EMAIL>',
      firstName: 'John',
      lastName: 'Doe',
      role: 'USER',
    },
  })
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
  };
}
