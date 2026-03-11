import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Product ID',
    example: '9d5892de-e007-4a0e-a616-37a96fef21f5',
  })
  id: string;

  @ApiProperty({
    description: 'Product name',
    example: 'Wireless HeadPhone',
  })
  name: string;

  @ApiProperty({
    description: 'Product Description',
    example:
      'High quality wireless headphones with noise cancellation technology.',
    nullable: true,
  })
  description: string | null;

  @ApiProperty({
    description: 'Product Price',
    example: 99.99,
  })
  price: number;

  @ApiProperty({
    description: 'Product Stock Quantity',
    example: 100,
  })
  stock: number;

  @ApiProperty({
    description: 'Stock Keeping Unit',
    example: 'WH-001',
  })
  sku: string;

  @ApiProperty({
    description: 'Product Image URL',
    example: 'http://example.com/headphone.png',
  })
  imageUrl: string | null;

  @ApiProperty({
    description: 'Product Category',
    example: 'Electronics',
  })
  category: string | null;

  @ApiProperty({
    description: 'Product Availability',
    example: true,
  })
  isActive: boolean;

  @ApiProperty({
    description: 'Creation Timestamp',
  })
  createdAt: Date;

  @ApiProperty({
    description: 'updated Timestamp',
  })
  updatedAt: Date;
}
