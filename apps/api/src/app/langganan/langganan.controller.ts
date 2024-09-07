import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { LanggananService } from './langganan.service';
import { CreateLanggananDto } from './dto/create-langganan.dto';
import { UpdateLanggananDto } from './dto/update-langganan.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { LanggananEntity } from './entities/langganan.entity';
import { RequestLanggananDto } from './dto/request-langganan.dto';
import { ResponseLanggananEntity } from './entities/response-langganan.entity';

@ApiTags('langganan')
@Controller('langganan')
export class LanggananController {
  constructor(private readonly langgananService: LanggananService) {}

  @ApiOperation({
    description: 'Endpoint for creating a new subscription',
    summary: 'Create new subscription',
  })
  @ApiCreatedResponse({
    description: 'The subscription has been successfully created.',
    type: LanggananEntity,
  })
  @Post()
  create(@Body() createLanggananDto: CreateLanggananDto) {
    return this.langgananService.create(createLanggananDto);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving all subscriptions',
    summary: 'Retrieve all subscriptions',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of subscriptions.',
    type: ResponseLanggananEntity,
  })
  @Get()
  findAll(@Query() query?: RequestLanggananDto) {
    const { page, take, ...filter } = query;
    return this.langgananService.findAll(page, take, filter);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving a subscription by ID',
    summary: 'Retrieve subscription by ID',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the subscription.',
    type: LanggananEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the subscription',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.langgananService.findOne(id);
  }

  @ApiOperation({
    description: 'Endpoint for updating a subscription by ID',
    summary: 'Update subscription by ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated the subscription.',
    type: LanggananEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the subscription',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanggananDto: UpdateLanggananDto
  ) {
    return this.langgananService.update(id, updateLanggananDto);
  }

  @ApiOperation({
    description: 'Endpoint for deleting a subscription by ID',
    summary: 'Delete subscription by ID',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the subscription.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the subscription',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.langgananService.remove(id);
  }
}
