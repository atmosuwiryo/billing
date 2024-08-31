import { Injectable } from '@nestjs/common';
import { CreatePaketDto } from './dto/create-paket.dto';
import { UpdatePaketDto } from './dto/update-paket.dto';
import { PrismaService } from '../../services/prisma.service';
import { PaketEntity } from './entities/paket.entity';
import { OrderBy } from './dto/request-paket.dto';
import { ResponsePaketEntity } from './entities/response-paket.entity';
import { PaginationService } from '../../services/pagination.service';

@Injectable()
export class PaketService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<PaketEntity>
  ) {}
  async create(createPaketDto: CreatePaketDto) {
    const paket = await this.prisma.paket.create({
      data: createPaketDto,
    });
    return new PaketEntity(paket);
  }

  async findAll(page=1, take=20, filter) {
    const skip = (page - 1) * take;

    const query = {
      skip,
      take,
      where: {}
    };

    if (Object.keys(filter).length > 0) {
      if ('search'in filter) {
        query['where'] = {
          OR: [
            { kecepatan: { contains: filter['search'], mode: 'insensitive' } },
          ]
        };
      }

      if ('orderBy' in filter) {

        let orderDirection = 'asc';  // init default order direction
        if ('orderDirection' in filter) {
          orderDirection = filter['orderDirection'];
        }

        if (filter['orderBy'] in OrderBy) {  // Check if filter is valid
          query['orderBy'] = { [filter['orderBy']]: { name: orderDirection } };
        } else {
          query['orderBy'] = { [filter['orderBy']]: orderDirection };
        }

      } else {
        query['orderBy'] = { createdAt: 'desc' };
      }

      const queryFilter = [];
      let isQueryFilter = false;

      if ('kecepatan' in filter) {
        isQueryFilter = true;
        queryFilter.push({ kecepatan: { contains: filter['kecepatan'], mode: 'insensitive' } });
      }

      if ('harga' in filter) {
        isQueryFilter = true;
        queryFilter.push({ harga: { contains: filter['harga'], mode: 'insensitive' } });
      }

      if ('isLangganan' in filter) {
        isQueryFilter = true;
        queryFilter.push({ isLangganan: { equals: filter['isLangganan'] } });
      }

      if ('isActive' in filter) {
        isQueryFilter = true;
        queryFilter.push({ isActive: { equals: filter['isActive'] } });
      }

      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.paket.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.paket.count({ where: query.where }),
    ]);

    const pakets = results.map(paket => {
      return new PaketEntity(paket);
    });

    const paginatedResult: ResponsePaketEntity = await this.paginationService.paginate(count, take, pakets);
    return paginatedResult;

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
