import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guards';
import { RolesGuard } from 'src/common/guards/roles.guards';
import { UsersService } from './users.service';
import { UserResponseDto } from './dto/user-response.dto';
import type { RequestWithUser } from 'src/common/interfaces/request-with-user.interface';
import { Roles } from 'src/common/decorators/roles.decorators';
import { Role } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUser } from 'src/common/decorators/get-user.decorator';
import { ChangePasswordDto } from './dto/change-password.dto';

@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //API1: GET THE SELF USER
  @Get('me')
  @ApiOperation({ summary: 'Get Current User Profile' })
  @ApiResponse({
    status: 200,
    description: 'The Current user Profile',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getProfile(@Req() req: RequestWithUser): Promise<UserResponseDto> {
    return await this.userService.findOne(req.user.id);
  }

  //API2: GET ALL USER BY ADMIN
  @Get()
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [UserResponseDto],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<UserResponseDto[]> {
    return await this.userService.findAll();
  }

  //API3: GET USER BY ID FOR ADMIN PURPOSE
  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({
    status: 200,
    description: 'The user with the specified ID',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'User Not Found!' })
  async findOne(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findOne(id);
  }

  //API4: UPDATE CURRENT USER
  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'The updated user profile',
    type: UserResponseDto,
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 409, description: 'Email already in use' })
  async updateProfile(
    userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return await this.userService.update(userId, updateUserDto);
  }

  //API5: CHANGE CURRENT USER PASSWORD
  @Patch('me/password')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Change current user Password' })
  @ApiResponse({ status: 200, description: 'Password chnaged successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async changePassword(
    @GetUser('id') userId: string,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<{ message: string }> {
    return await this.userService.changePassword(userId, changePasswordDto);
  }

  //API6: DELETE USER CURRENT ACCOUNT
  @Delete('me')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete current user account.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async deleteAccount(
    @GetUser('id') userId: string,
  ): Promise<{ message: string }> {
    return await this.userService.remove(userId);
  }
}
