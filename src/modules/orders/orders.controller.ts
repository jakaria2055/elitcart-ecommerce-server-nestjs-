import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiTooManyRequestsResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { OrdersService } from './orders.service';
import {
  ModerateThrottle,
  RelaxedThrottle,
} from 'src/common/decorators/custom-throttler.decorators';
import { CreateOrderDto } from './dto/create-order.dto';
import {
  OrderApiResponseDto,
  OrderResponseDto,
  PaginatedOrderResponseDto,
} from './dto/order-response.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { QueryOrderDto } from './dto/query-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@ApiTags('orders')
@ApiBearerAuth('JWT-auth')
@Controller('orders')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //CREATE ORDER
  @Post()
  @ModerateThrottle()
  @ApiOperation({ summary: 'Create a new Orders' })
  @ApiBody({
    type: CreateOrderDto,
  })
  @ApiCreatedResponse({
    description: 'Order created Successfully',
    type: OrderApiResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid data or insufficient stock',
  })
  @ApiNotFoundResponse({
    description: 'Cart not found or empty',
  })
  @ApiTooManyRequestsResponse({
    description: 'To many request-rate limit exceeded.',
  })
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser('id') userId: string,
  ) {
    return await this.ordersService.create(userId, createOrderDto);
  }

  //GET ALL ORDERS BY ADMIN
  @Get('admin/all')
  @Roles(Role.ADMIN)
  @RelaxedThrottle()
  @ApiOperation({ summary: '[ADMIN] get all orders by paginated' })
  @ApiQuery({
    name: 'status',
    required: false,
    type: String,
  })
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
  })
  @ApiResponse({
    description: 'List of Orders',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(OrderResponseDto) },
        },
        total: { type: 'number' },
        page: { type: 'number' },
        limit: { type: 'number' },
      },
    },
  })
  @ApiForbiddenResponse({
    description: 'Admin access Required',
  })
  async findAllForAdmin(@Query() query: QueryOrderDto) {
    return await this.ordersService.findAllForAdmin(query);
  }

  //GET ORDER FROM USER SIDE
  @Get()
  @RelaxedThrottle()
  @ApiOperation({
    summary: 'Get all order of current user(paginated)',
  })
  @ApiQuery({ name: 'status', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiOkResponse({
    description: 'List of user orders:',
    type: PaginatedOrderResponseDto,
  })
  async findAll(@Query() query: QueryOrderDto, @GetUser('id') userId: string) {
    return await this.ordersService.findAll(userId, query);
  }

  //GET ORDER BY IS (ADMIN)
  @Get('admin/:id')
  @Roles(Role.ADMIN)
  @RelaxedThrottle()
  @ApiOperation({
    summary: '[ADMIN] Get order by ID',
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
  })
  @ApiOkResponse({
    description: 'Order Details',
    type: OrderApiResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Order not found',
  })
  @ApiForbiddenResponse({
    description: 'Admin access required.',
  })
  async findOneAdmin(@Param('id') id: string) {
    return await this.ordersService.findOne(id);
  }

  //GET ORDER BY ID (USER)
  @Get(':id')
  @RelaxedThrottle()
  @ApiOperation({
    summary: 'Get an order by ID for current user',
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
  })
  @ApiOkResponse({ description: 'Order details', type: OrderApiResponseDto })
  @ApiNotFoundResponse({
    description: 'Order Not Found',
  })
  async findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.ordersService.findOne(id, userId);
  }

  //ORDER STATUS UPDATE BY ADMIN
  @Patch('admin/:id')
  @Roles(Role.ADMIN)
  @ModerateThrottle()
  @ApiOperation({
    summary: '[ADMIN] update order status',
  })
  @ApiParam({
    name: 'id',
    description: 'Order ID',
  })
  @ApiBody({
    type: UpdateOrderDto,
  })
  @ApiOkResponse({
    description: 'Order Update Successfully',
    type: OrderApiResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Order Not Found',
  })
  @ApiForbiddenResponse({
    description: 'Admin access required',
  })
  async updateAdmin(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return await this.ordersService.update(id, dto);
  }

  //ORDER UPDATE BY USER
  @Patch(':id')
  @ModerateThrottle()
  @ApiOperation({ summary: 'Update Your Own Order' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiBody({ type: UpdateOrderDto })
  @ApiOkResponse({
    description: 'Order updated successfully.',
  })
  @ApiNotFoundResponse({
    description: 'Order does not exists',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateOrderDto,
    @GetUser('id') userId: string,
  ) {
    return await this.ordersService.update(id, dto, userId);
  }

  //ADMIN DELETE AN ORDER
  @Delete('admin/:id')
  @Roles(Role.ADMIN)
  @ModerateThrottle()
  @ApiOperation({ summary: 'Admin cancel order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Order Cancelled Sussceefully.',
    type: OrderApiResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Order Not Found',
  })
  async cancelAdmin(@Param('id') id: string) {
    return await this.ordersService.cancel(id);
  }

  //USER DELETE ORDER
  @Delete(':id')
  @ModerateThrottle()
  @ApiOperation({ summary: 'User cancel order by ID' })
  @ApiParam({ name: 'id', description: 'Order ID' })
  @ApiOkResponse({
    description: 'Order Cancelled Successfully.',
    type: OrderApiResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Order Not Found',
  })
  async cancel(@Param('id') id: string, @GetUser('id') userId: string) {
    return await this.ordersService.cancel(id, userId);
  }
}
