import { Injectable } from '@nestjs/common';
import { CreateProdukDto } from './dto/create-produk.dto';
import { UpdateProdukDto } from './dto/update-produk.dto';
import { PrismaService } from '../../services/prisma.service';
import { ProdukEntity } from './entities/produk.entity';
import { ResponseProdukEntity } from './entities/response-produk.entity';
import { PaginationService } from '../../services/pagination.service';

@Injectable()
export class ProdukService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<ProdukEntity>
  ) {}
  async create(createProdukDto: CreateProdukDto) {
    const produk = await this.prisma.produk.create({ data: createProdukDto,
    });
    return new ProdukEntity(produk);
  }

  async findAll(page=1, take=20, filter) {
    const skip = (page - 1) * take;

    const query = {
      skip,
      take,
      where: {},
      include: {
        paket: true
      }
    };

    if (Object.keys(filter).length > 0) {
      if ('search'in filter) {
        query['where'] = {
          OR: [
            { nama: { contains: filter['search'], mode: 'insensitive' } },
          ]
        };
      }

      if ('orderBy' in filter) {

        let orderDirection = 'asc';  // init default order direction
        if ('orderDirection' in filter) {
          orderDirection = filter['orderDirection'];
        }

        query['orderBy'] = { [filter['orderBy']]: orderDirection };

      } else {
        query['orderBy'] = { createdAt: 'desc' };
      }

      const queryFilter = [];
      let isQueryFilter = false;

      if ('nama' in filter) {
        isQueryFilter = true;
        queryFilter.push({ nama: { contains: filter['nama'], mode: 'insensitive' } });
      }

      if ('jenisDiskon' in filter) {
        isQueryFilter = true;
        queryFilter.push({ jenisDiskon: { equals: filter['jenisDiskon'] } });
      }

      if ('satuanWaktuDiskon' in filter) {
        isQueryFilter = true;
        queryFilter.push({ satuanWaktuDiskon: { equals: filter['satuanWaktuDiskon'] } });
      }

      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.produk.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.produk.count({ where: query.where }),
    ]);

    const produks = results.map(produk => {
      return new ProdukEntity(produk);
    });

    const paginatedResult: ResponseProdukEntity = await this.paginationService.paginate(count, take, produks);
    return paginatedResult;

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
