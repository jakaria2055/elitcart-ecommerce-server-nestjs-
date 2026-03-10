import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
  @ApiProperty({
    example: 'hjvbhj-f78vejeeh-vuie',
    description: 'Th euniq identifier id of the category',
  })
  id: string;

  @ApiProperty({
    example: 'Electronics',
    description: 'The name of the category',
  })
  name: string;

  @ApiProperty({
    example: 'Devices and gadgets including phones, laptop, accessories.',
    description: 'A brief description of the category',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    example: 'electronics',
    description: 'The URL friendly slug for the category.',
    nullable: true,
  })
  slug: string | null;

  @ApiProperty({
    example: 'http://example.com/images/electronics.png',
    description: 'URL of the category Images',
    nullable: true,
  })
  imageUrl: string | null;

  @ApiProperty({
    example: true,
    description: 'Indicates if the category is active',
  })
  isActive: boolean;

  @ApiProperty({
    example: 150,
    description: 'Number of products of this category',
  })
  productCount: number;

  @ApiProperty({
    example: '2024-10-01T12:00:00Z',
    description: 'The date and time when the category was created.',
  })
  createdAt: Date;

  @ApiProperty({
    example: '2024-10-01T12:00:00Z',
    description: 'The date and time when the category was updated.',
  })
  updatedAt: Date;
}
