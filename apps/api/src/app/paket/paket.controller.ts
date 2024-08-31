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
import { PaketService } from './paket.service';
import { CreatePaketDto } from './dto/create-paket.dto';
import { UpdatePaketDto } from './dto/update-paket.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { PaketEntity } from './entities/paket.entity';
import { RequestPaketDto } from './dto/request-paket.dto';
import { ResponsePaketEntity } from './entities/response-paket.entity';

@ApiTags('paket')
@Controller('paket')
export class PaketController {
  constructor(private readonly paketService: PaketService) {}

  @ApiOperation({
    description: 'Endpoint for creating a new package',
    summary: 'Create new package',
  })
  @ApiCreatedResponse({
    description: 'The package has been successfully created.',
    type: PaketEntity,
  })
  @Post()
  create(@Body() createPaketDto: CreatePaketDto) {
    return this.paketService.create(createPaketDto);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving all packages',
    summary: 'Retrieve all packages',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of packages.',
    type: ResponsePaketEntity,
  })
  @Get()
  findAll(@Query() query?: RequestPaketDto) {
    const { page, take, ...filter } = query;
    return this.paketService.findAll(page, take, filter);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving a package by ID',
    summary: 'Retrieve package by ID',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the package.',
    type: PaketEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the package',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paketService.findOne(id);
  }

  @ApiOperation({
    description: 'Endpoint for updating a package by ID',
    summary: 'Update package by ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated the package.',
    type: PaketEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the package',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaketDto: UpdatePaketDto) {
    return this.paketService.update(id, updatePaketDto);
  }

  @ApiOperation({
    description: 'Endpoint for deleting a package by ID',
    summary: 'Delete package by ID',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the package.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the package',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paketService.remove(id);
  }
}
