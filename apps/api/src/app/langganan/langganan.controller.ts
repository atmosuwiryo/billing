import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LanggananService } from './langganan.service';
import { CreateLanggananDto } from './dto/create-langganan.dto';
import { UpdateLanggananDto } from './dto/update-langganan.dto';

@Controller('langganan')
export class LanggananController {
  constructor(private readonly langgananService: LanggananService) {}

  @Post()
  create(@Body() createLanggananDto: CreateLanggananDto) {
    return this.langgananService.create(createLanggananDto);
  }

  @Get()
  findAll() {
    return this.langgananService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.langgananService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLanggananDto: UpdateLanggananDto
  ) {
    return this.langgananService.update(+id, updateLanggananDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.langgananService.remove(+id);
  }
}
