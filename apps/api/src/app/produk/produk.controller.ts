import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProdukService } from './produk.service';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { ApiTags, ApiOperation, ApiCreatedResponse, ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ProdukEntity } from './entities/produk.entity';

@ApiTags('produk')
@Controller('produk')
export class ProdukController {
  constructor(private readonly produkService: ProdukService) {}

  @ApiOperation({
    description: 'Endpoint for creating a new product',
    summary: 'Create new product',
  })
  @ApiCreatedResponse({
    description: 'The product has been successfully created.',
    type: ProdukEntity,
  })
  @Post()
  create(@Body() createProdukDto: CreateProdukDto) {
    return this.produkService.create(createProdukDto);
  }

  @ApiOperation({
    description: 'Endpoint for retrieving all products',
    summary: 'Retrieve all products',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved list of products.',
    type: [ProdukEntity], // Indicates an array of ProdukEntity
  })
  @Get()
  findAll() {
    return this.produkService.findAll();
  }

  @ApiOperation({
    description: 'Endpoint for retrieving a product by ID',
    summary: 'Retrieve product by ID',
  })
  @ApiOkResponse({
    description: 'Successfully retrieved the product.',
    type: ProdukEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the product',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.produkService.findOne(+id);
  }

  @ApiOperation({
    description: 'Endpoint for updating a product by ID',
    summary: 'Update product by ID',
  })
  @ApiOkResponse({
    description: 'Successfully updated the product.',
    type: ProdukEntity,
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the product',
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProdukDto: UpdateProdukDto) {
    return this.produkService.update(+id, updateProdukDto);
  }

  @ApiOperation({
    description: 'Endpoint for deleting a product by ID',
    summary: 'Delete product by ID',
  })
  @ApiOkResponse({
    description: 'Successfully deleted the product.',
  })
  @ApiParam({
    name: 'id',
    description: 'Unique identifier of the product',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.produkService.remove(+id);
  }
}
