import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ApiCreatedResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProfileEntity } from './entities/profile.entity';

@ApiTags('profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiOperation({
    description: 'Endpoint for creating a new profile',
    summary: 'Create new profile',
  })
  @ApiCreatedResponse({
    description: 'The record has been successfully created.',
    type: ProfileEntity,
  })
  @Post()
  create(@Body() createProfileDto: CreateProfileDto) {
    return this.profileService.create(createProfileDto);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving all profiles',
    summary: 'Retrieve all profiles',
  })
  @ApiCreatedResponse({
    description: 'Successfully retrieved list of profiles.',
    type: [ProfileEntity], // Indicates an array of ProfileEntity
  })
  @Get()
  findAll() {
    return this.profileService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint for retrieving a profile by ID',
    summary: 'Retrieve profile by ID',
  })
  @ApiCreatedResponse({
    description: 'Successfully retrieved the profile.',
    type: ProfileEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.profileService.findOne(id);
  }

  @ApiOperation({
    description: 'Endpoint for updating a profile by ID',
    summary: 'Update profile by ID',
  })
  @ApiCreatedResponse({
    description: 'Successfully updated the profile.',
    type: ProfileEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profileService.update(id, updateProfileDto);
  }

  @ApiOperation({
    description: 'Endpoint for removing a profile by ID',
    summary: 'Remove profile by ID',
  })
  @ApiCreatedResponse({
    description: 'Successfully removed the profile.',
    type: ProfileEntity,
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.profileService.remove(id);
  }
}
