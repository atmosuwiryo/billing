import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TagihanService } from './tagihan.service';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { TagihanEntity } from './entities/tagihan.entity';

@ApiTags('tagihan')
@Controller('tagihan')
export class TagihanController {
  constructor(private readonly tagihanService: TagihanService) {}

  @ApiOperation({
    description: 'Endpoint for creating a new bill',
    summary: 'Create new bill',
  })
  @ApiCreatedResponse({
    description: 'The bill has been successfully created.',
    type: TagihanEntity,
  })
  @Post()
  create(@Body() createTagihanDto: CreateTagihanDto) {
    return this.tagihanService.create(createTagihanDto);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving all bills',
    summary: 'Retrieve all bills',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of bills.',
    type: [TagihanEntity], // Indicates an array of TagihanEntity
  })
  @Get()
  findAll() {
    return this.tagihanService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint for retrieving a bill by ID',
    summary: 'Retrieve bill by ID',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the bill.',
    type: TagihanEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the bill',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tagihanService.findOne(+id);
  }

  @ApiOperation({
    description: 'Endpoint for updating a bill by ID',
    summary: 'Update bill by ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated the bill.',
    type: TagihanEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the bill',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTagihanDto: UpdateTagihanDto) {
    return this.tagihanService.update(+id, updateTagihanDto);
  }

  @ApiOperation({
    description: 'Endpoint for deleting a bill by ID',
    summary: 'Delete bill by ID',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the bill.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the bill',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tagihanService.remove(+id);
  }
}
