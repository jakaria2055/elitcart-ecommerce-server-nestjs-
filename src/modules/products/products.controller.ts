import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { Roles } from 'src/common/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { Role } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductResponseDto } from './dto/product-response.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  //CREATE PRODUCT
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new Product(Admin Only)' })
  @ApiBody({ type: CreateProductDto })
  @ApiResponse({
    status: 201,
    description: 'Product Created Successfully',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'SKU already exists',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden-admin role required',
  })
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.create(createProductDto);
  }

  //GET ALL PRODUCTS
  @Get()
  @ApiOperation({ summary: 'Get all product with optional filter.' })
  @ApiResponse({
    status: 200,
    description: 'List of products with pagination',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: { $ref: '#components/schemas/ProductResponseDto' },
        },
        meta: {
          type: 'object',
          properties: {
            total: { type: 'number' },
            page: { type: 'number' },
            limit: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  async findAll(@Query() queryDto: QueryProductDto) {
    return await this.productService.findAll(queryDto);
  }

  //GET PRODUCT BY ID
  @Get(':id')
  @ApiOperation({ summary: 'Get Product By ID' })
  @ApiResponse({
    status: 200,
    description: 'Product Details',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found',
  })
  async findOne(@Param('id') id: string): Promise<ProductResponseDto> {
    return await this.productService.findOne(id);
  }

  //UPDATE PRODUCT BY ID (ADMIN ONLY)
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update a new Product(Admin Only)' })
  @ApiBody({
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Product Updated Successfully.',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found.',
  })
  @ApiResponse({
    status: 409,
    description: 'SKU already exists',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    return await this.productService.update(id, updateProductDto);
  }

  //UPDATE PRODUCT STOCK
  @Patch(':id/stock')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Update Product Stock (Admin Only)' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        quantity: {
          type: 'number',
          description:
            'Stock adjustment. (Positive to add, Negative to subtract)',
          example: 10,
        },
      },
      required: ['quantity'],
    },
  })
  @ApiResponse({
    status: 200,
    description: 'stock Updated Successfully.',
    type: ProductResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Insufficient Stock.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found',
  })
  async updateStock(
    @Param('id') id: string,
    @Body('quantity') quantity: number,
  ): Promise<ProductResponseDto> {
    return await this.productService.updateStock(id, quantity);
  }

  //DELETE PRODUCT BY ID(ADMIN ONLY)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @ApiBearerAuth('JWT-auth')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete Product by ID(Admin Only)' })
  @ApiResponse({
    status: 200,
    description: 'Product Deleted Successfully.',
  })
  @ApiResponse({
    status: 404,
    description: 'Product Not Found.',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot delete Product in Active Orders',
  })
  async remove(@Param('id') id: string): Promise<{ message: string }> {
    return await this.productService.remove(id);
  }
}
