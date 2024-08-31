import { Injectable } from '@nestjs/common';
import { CreateLanggananDto } from './dto/create-langganan.dto';
import { UpdateLanggananDto } from './dto/update-langganan.dto';
import { PrismaService } from '../../services/prisma.service';
import { PaginationService } from '../../services/pagination.service';
import { LanggananEntity } from './entities/langganan.entity';

@Injectable()
export class LanggananService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<LanggananEntity>
  ) {}

  create(createLanggananDto: CreateLanggananDto) {
    return this.prisma.langganan.create({
      data: createLanggananDto,
    });
  }

  findAll() {
    return `This action returns all langganan`;
  }

  async findOne(id: string) {
    const langganan = await this.prisma.langganan.findUniqueOrThrow({
      where: { id },
    });
    return new LanggananEntity(langganan);
  }

  async update(id: string, updateLanggananDto: UpdateLanggananDto) {
    const langganan = await this.prisma.langganan.update({
      where: { id },
      data: updateLanggananDto,
    });
    return new LanggananEntity(langganan);
  }

  async remove(id: string) {
    const langganan = await this.prisma.langganan.delete({
      where: { id },
    });
    return new LanggananEntity(langganan);
  }
}
