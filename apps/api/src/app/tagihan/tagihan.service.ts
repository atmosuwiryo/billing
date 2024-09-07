import { Injectable } from '@nestjs/common';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';
import { PrismaService } from '../../services/prisma.service';
import { TagihanEntity } from './entities/tagihan.entity';
import { PaginationService } from '../../services/pagination.service';
import { ResponseTagihanEntity } from './entities/response-tagihan.entity';

@Injectable()
export class TagihanService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<TagihanEntity>
  ) {}
  async create(createTagihanDto: CreateTagihanDto) {
    const tagihan = await this.prisma.tagihan.create({
      data: createTagihanDto
    })
    return new TagihanEntity(tagihan);
  }

  async findAll(page=1, take=20, filter) {
    const skip = (page - 1) * take;

    const query = {
      skip,
      take,
      where: {},
      include: {
        langganan: true
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
        console.log('order by in filter')

        let orderDirection = 'asc';  // init default order direction
        if ('orderDirection' in filter) {
          orderDirection = filter['orderDirection'];
        }

        if (query['orderBy'] === 'namaPelanggan') {
          console.log('order by nama pelanggan');
          query['orderBy'] = { langganan: { user: { profile : { namaPelanggan: orderDirection } } } };
        } else if (query['orderBy'] === 'namaProduk') {
          query['orderBy'] = { langganan: { produk: { paket: { kecepatan: orderDirection } } } };
        } else {
          query['orderBy'] = { [filter['orderBy']]: orderDirection };
        }
      } else {
        console.log('order by else');
        query['orderBy'] = { createdAt: 'desc' };
      }

      const queryFilter = [];
      let isQueryFilter = false;

      if ('namaPelanggan' in filter) {
        isQueryFilter = true;
        queryFilter.push({
          langganan: {
            user: {
              profile: {
                namaPelanggan:  { contains: filter['namaPelanggan'], mode: 'insensitive' }
                }
            }
          }
        });
      }

      if ('namaProduk' in filter) {
        isQueryFilter = true;
        queryFilter.push({
          langganan: {
            produk: {
              nama:  { contains: filter['nama'], mode: 'insensitive' }
            }
          }
        });
      }

      if ('status' in filter) {
        isQueryFilter = true;
        queryFilter.push({ status: { equals: filter['status'] } });
      }

      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.tagihan.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.tagihan.count({ where: query.where }),
    ]);

    const tagihans = results.map(tagihan => {
      return new TagihanEntity(tagihan);
    });

    const paginatedResult: ResponseTagihanEntity = await this.paginationService.paginate(count, take, tagihans);
    return paginatedResult;

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
