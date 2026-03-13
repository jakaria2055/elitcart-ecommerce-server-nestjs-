import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { PaymentsService } from './payments.service';
import { CreatePaymentIntentDto } from './dto/create-payment-intent.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import {
  CreatePaymentIntentApiResponseDto,
  PaymentApiResponseDto,
} from './dto/payment-response.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Controller('payments')
@UseGuards(JwtAuthGuard)
@ApiTags('payments')
@ApiBearerAuth()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  //CREATE PAYMENT
  @Post('create-intent')
  @ApiOperation({
    summary: 'create payment intent',
    description: 'Create a payment intent for an order',
  })
  @ApiCreatedResponse({
    description: 'Payment Intent created successfully.',
    type: CreatePaymentIntentApiResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'invalid data or order not found',
  })
  async createPaymentIntent(
    @Body() createPaymentIntentDto: CreatePaymentIntentDto,
    @GetUser('id') userId: string,
  ) {
    return await this.paymentsService.createPaymentIntent(
      userId,
      createPaymentIntentDto,
    );
  }

  //PAYMENT CONFIRM
  @Post('confirm')
  @ApiOperation({
    summary: 'Confirm Payment',
    description: 'Confirm a payment intent for an order',
  })
  @ApiResponse({
    status: 200,
    description: 'Payment confirmed successfully',
    type: PaymentApiResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Payment not found or already completed',
  })
  async confirmPayment(
    @Body() confirmPaymentDto: ConfirmPaymentDto,
    @GetUser('id') userId: string,
  ) {
    return await this.paymentsService.confirmPayment(userId, confirmPaymentDto);
  }
}
