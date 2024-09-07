import { Injectable } from '@nestjs/common';
import { CreateLanggananDto } from './dto/create-langganan.dto';
import { UpdateLanggananDto } from './dto/update-langganan.dto';
import { PrismaService } from '../../services/prisma.service';
import { PaginationService } from '../../services/pagination.service';
import { LanggananEntity } from './entities/langganan.entity';
import { ResponseLanggananEntity } from './entities/response-langganan.entity';

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

  async findAll(page=1, take=20, filter) {
    const skip = (page - 1) * take;

    const query = {
      skip,
      take,
      include: {
        user: {
          include: {
            profile: true
          }
        },
        produk: {
          include: {
            paket: true
          }
        }
      },
      where: {}
    };

    if (Object.keys(filter).length > 0) {
      if ('search'in filter) {
        query['where'] = {
          OR: [
            { user: { profile : { namaPelanggan: { contains: filter['search'], mode: 'insensitive' } } } },  // search by nama pelanggan
            { user: { profile : { noRegistrasi: { contains: filter['search'], mode: 'insensitive' } } } },  // search by no registrasi
            { produk: { nama : { contains: filter['search'], mode: 'insensitive' } } },  // search by nama produk
            { produk: { paket : { kecepatan : { contains: filter['search'], mode: 'insensitive' } } } }  // search by kecepatan paket
          ]
        };
      }

      if ('orderBy' in filter) {

        let orderDirection = 'desc';  // init default order direction
        if ('orderDirection' in filter) {
          orderDirection = filter['orderDirection'];
        }

        if (query['orderBy'] === 'namaPelanggan') {
          query['orderBy'] = { user: { profile : { namaPelanggan: orderDirection } } };
        } else if (query['orderBy'] === 'kecepatan') {
          query['orderBy'] = { produk: { paket: { kecepatan: orderDirection } } };
        } else if (query['orderBy'] === 'noRegistrasi') {
          query['orderBy'] = { user: { profile : { noRegistrasi: orderDirection } } };
        } else if (query['orderBy'] === 'namaProduk') {
          query['orderBy'] = { produk: { nama: orderDirection } };
        }
      } else {
        query['orderBy'] = { createdAt: 'desc' };
      }

      const queryFilter = [];
      let isQueryFilter = false;

      if ('kecepatan' in filter) {
        isQueryFilter = true;
        queryFilter.push({ produk: { paket: { kecepatan: { contains: filter['kecepatan'], mode: 'insensitive' } } } });
      }

      if ('namaPelanggan' in filter) {
        isQueryFilter = true;
        queryFilter.push({ user: { profile : { namaPelanggan: { contains: filter['namaPelanggan'], mode: 'insensitive' } } } });
      }

      if ('noRegistrasi' in filter) {
        isQueryFilter = true;
        queryFilter.push({ user: { profile : { noRegistrasi: { contains: filter['noRegistrasi'], mode: 'insensitive' } } } });
      }

      if ('namaProduk' in filter) {
        isQueryFilter = true;
        queryFilter.push({ produk: { nama : { contains: filter['namaProduk'], mode: 'insensitive' } } });
      }

      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.langganan.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.langganan.count({ where: query.where }),
    ]);

    const langganans = results.map(langganan => {
      return new LanggananEntity(langganan);
    });

    const paginatedResult: ResponseLanggananEntity = await this.paginationService.paginate(count, take, langganans);
    return paginatedResult;

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
