import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
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
@ApiBearerAuth('JWT-auth')
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

  //GET ALL PAYMENTS
  @Get()
  @ApiOperation({
    summary: 'Get All Payments',
    description: 'Get all payments for the current user.',
  })
  @ApiOkResponse({
    description: 'Payment retrieved successfully.',
    type: PaymentApiResponseDto,
  })
  async findAll(@GetUser('id') userId: string) {
    return await this.paymentsService.findAll(userId);
  }

  //GET PAYMENT BY ID
  @Get(':id')
  @ApiParam({
    name: 'id',
    description: 'Payment ID',
    example: '603c1d2e-c118-482e-a411-19135ad6aecd',
  })
  @ApiOperation({
    summary: 'Get Payment By ID',
    description: 'get a specific payment by its ID',
  })
  @ApiOkResponse({
    description: 'Payment Retrieved succeessfully.',
    type: PaymentApiResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Payment Not Found.',
  })
  async findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.paymentsService.findOne(id, userId);
  }

  //GET PAYMENT BY ORDER ID
  @Get('order/:orderId')
  @ApiParam({ name: 'orderId', description: 'Order ID', example: 'ord-123' })
  @ApiOperation({
    summary: 'Get Payment By Order ID',
    description: 'Get Payment information for a specific order',
  })
  @ApiOkResponse({
    description: 'Payment Retrieved Successfully.',
    type: PaymentApiResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Payment Not Found' })
  async findByOrder(
    @Param('orderId') orderId: string,
    @GetUser('id') userId: string,
  ) {
    return await this.paymentsService.findByOrder(orderId, userId);
  }
}
