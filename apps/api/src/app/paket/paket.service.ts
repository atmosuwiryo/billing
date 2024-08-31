import { Injectable } from '@nestjs/common';
import { CreatePaketDto } from './dto/create-paket.dto';
import { UpdatePaketDto } from './dto/update-paket.dto';
import { PrismaService } from '../../services/prisma.service';
import { PaketEntity } from './entities/paket.entity';

@Injectable()
export class PaketService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(createPaketDto: CreatePaketDto) {
    const paket = await this.prisma.paket.create({
      data: createPaketDto,
    });
    return new PaketEntity(paket);
  }

  findAll() {
    return `This action returns all paket`;
  }

  async findOne(id: string) {
    const paket = await this.prisma.paket.findUniqueOrThrow({
      where: { id },
    });
    return new PaketEntity(paket);
  }

  async update(id: string, updatePaketDto: UpdatePaketDto) {
    const paket = await this.prisma.paket.update({
      where: { id },
      data: updatePaketDto,
    });
    return new PaketEntity(paket);
  }

  async remove(id: string) {
    const paket = await this.prisma.paket.delete({
      where: { id },
    });
    return new PaketEntity(paket);
  }
}
