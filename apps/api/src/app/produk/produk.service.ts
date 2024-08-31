import { Injectable } from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { PrismaService } from '../../services/prisma.service';
import { ProdukEntity } from './entities/produk.entity';

@Injectable()
export class ProdukService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(createProdukDto: CreateProdukDto) {
    const produk = await this.prisma.produk.create({
      data: createProdukDto,
    });
    return new ProdukEntity(produk);
  }

  findAll() {
    return `This action returns all produk`;
  }

  async findOne(id: string) {
    const produk = await this.prisma.produk.findUniqueOrThrow({
      where: { id },
    });
    return new ProdukEntity(produk);
  }

  async update(id: string, updateProdukDto: UpdateProdukDto) {
    const produk = await this.prisma.produk.update({
      where: { id },
      data: updateProdukDto,
    });
    return new ProdukEntity(produk);
  }

  async remove(id: string) {
    const produk = await this.prisma.produk.delete({
      where: { id },
    });
    return new ProdukEntity(produk);
  }
}
