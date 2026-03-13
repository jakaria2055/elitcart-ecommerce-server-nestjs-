import { ApiProperty } from '@nestjs/swagger';

export class PaymentResponseDto {
  @ApiProperty({
    example: '603c1d2e-c118-482e-a411-19135ad6aecd',
  })
  id: string;

  @ApiProperty({ example: 'order-123' })
  orderId: string;

  @ApiProperty({ example: 99.99 })
  amount: number;

  @ApiProperty({ example: 'USER-123' })
  userId: string;

  @ApiProperty({ example: 'usd' })
  currency: string;

  @ApiProperty({
    example: 'COMPLETED',
    enum: ['PENDING', 'COMPLETED', 'FAILED', 'CANCELLED'],
  })
  status: string;

  @ApiProperty({ example: 'STRIPE', nullable: true })
  paymentMethod: string | null;

  @ApiProperty({
    example: 'pi_1213546846',
    nullable: true,
  })
  transactionId: string | null;

  @ApiProperty({})
  createdAt: Date;

  @ApiProperty({})
  updatedAt: Date;
}

export class CreatePaymentIntentResponse {
  @ApiProperty({
    example: 'pi_12345656',
    description: 'Stripe client secret for payment confirmation',
  })
  clientSecret: string;

  @ApiProperty({
    example: '603c1d2e-c118-482e-a411-19135ad6aecd',
    description: 'Payment Id in DB',
  })
  paymentId: string;
}

export class CreatePaymentIntentApiResponseDto {
  @ApiProperty({
    example: true,
  })
  success: boolean;

  @ApiProperty({
    type: CreatePaymentIntentResponse,
  })
  data: CreatePaymentIntentResponse;

  @ApiProperty({
    example: 'Payment intent created successfully',
    required: false,
  })
  message?: string;
}

export class PaymentApiResponseDto {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ type: PaymentResponseDto })
  data: PaymentResponseDto;

  @ApiProperty({
    example: 'Payment confirmed successfully',
    required: false,
  })
  message?: string;
}
