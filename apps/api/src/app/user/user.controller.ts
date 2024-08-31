import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    description: 'Endpoint for creating a new user',
    summary: 'Create new user',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: UserEntity,
  })
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving all users',
    summary: 'Retrieve all users',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of users.',
    type: [UserEntity], // Indicates an array of UserEntity
  })
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint for retrieving a user by ID',
    summary: 'Retrieve user by ID',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the user.',
    type: UserEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    description: 'Endpoint for updating a user by ID',
    summary: 'Update user by ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated the user.',
    type: UserEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({
    description: 'Endpoint for deleting a user by ID',
    summary: 'Delete user by ID',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the user.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the user',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
