import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '123e342234-42364vdbf7-764dds-743278',
  })
  id: string;

  @ApiProperty({
    description: 'User Email Address',
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'User First Name',
    example: 'John',
    nullable: true,
  })
  firstName: string | null;

  @ApiProperty({
    description: 'User Last Name',
    example: 'Doe',
    nullable: true,
  })
  lastName: string | null;

  @ApiProperty({ description: 'User Role', enum: Role })
  role: Role;

  @ApiProperty({
    description: 'Account creation date',
    example: '2023-10-10T12:34:56.789Z',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'Last account update date',
    example: '2023-10-10T12:34:56.789Z',
  })
  updatedAt: Date;
}
