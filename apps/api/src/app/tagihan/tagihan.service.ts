import { Injectable } from '@nestjs/common';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { PrismaService } from '../../services/prisma.service';
import { TagihanEntity } from './entities/tagihan.entity';

@Injectable()
export class TagihanService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(createTagihanDto: CreateTagihanDto) {
    const tagihan = await this.prisma.tagihan.create({
      data: createTagihanDto
    })
    return new TagihanEntity(tagihan);
  }

  findAll() {
    return `This action returns all tagihan`;
  }

  async findOne(id: string) {
    const tagihan = await this.prisma.tagihan.findUniqueOrThrow({
      where: { id },
    });
    return new TagihanEntity(tagihan);
  }

  async update(id: string, updateTagihanDto: UpdateTagihanDto) {
    const tagihan = await this.prisma.tagihan.update({
      where: { id },
      data: updateTagihanDto
    });
    return new TagihanEntity(tagihan);
  }

  async remove(id: string) {
    const tagihan = await this.prisma.tagihan.delete({
      where: { id },
    });
    return new TagihanEntity(tagihan);
  }
}
