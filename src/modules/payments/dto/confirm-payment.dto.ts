import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmPaymentDto {
  @ApiProperty({
    description: 'Stripe Payment Intent ID',
    example: 'pi_3NqJZK2eZvKYlo2C0ABC1234',
  })
  @IsNotEmpty()
  @IsString()
  paymentIntentId: string;

  @ApiProperty({
    description: 'Order ID associated with this payment',
    example: '603c1d2e-c118-482e-a411-19135ad6aecd',
  })
  @IsNotEmpty()
  @IsString()
  orderId: string;
}
