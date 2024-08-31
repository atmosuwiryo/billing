import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { PrismaService } from '../../services/prisma.service';
import { OrderBy } from './dto/request-profile.dto';
import { ResponseProfileEntity } from './entities/response-profile.entity';
import { PaginationService } from '../../services/pagination.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<ProfileEntity>
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const profile = await this.prisma.profile.create({
      data: createProfileDto,
    });
    return new ProfileEntity(profile);
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
            { namaPelanggan: { contains: filter['search'], mode: 'insensitive' } },
            { noNIK: { contains: filter['search'], mode: 'insensitive' } },
            { noRegistrasi: { contains: filter['search'], mode: 'insensitive' } },
            { alamat: { contains: filter['search'], mode: 'insensitive' } },
            { noWA: { contains: filter['search'], mode: 'insensitive' } },
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

      if ('namaPelanggan' in filter) {
        isQueryFilter = true;
        queryFilter.push({ namaPelanggan: { contains: filter['namaPelanggan'], mode: 'insensitive' } });
      }

      if ('noNIK' in filter) {
        isQueryFilter = true;
        queryFilter.push({ noNIK: { contains: filter['noNIK'], mode: 'insensitive' } });
      }


      if ('noRegistrasi' in filter) {
        isQueryFilter = true;
        queryFilter.push({ noRegistrasi: { contains: filter['noRegistrasi'], mode: 'insensitive' } });
      }

      if ('alamat' in filter) {
        isQueryFilter = true;
        queryFilter.push({ alamat: { contains: filter['alamat'], mode: 'insensitive' } });
      }

      if ('noWA' in filter) {
        isQueryFilter = true;
        queryFilter.push({ noWA: { contains: filter['noWA'], mode: 'insensitive' } });
      }


      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.profile.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.profile.count({ where: query.where }),
    ]);

    const profiles = results.map(profile => {
      return new ProfileEntity(profile);
    });

    const paginatedResult: ResponseProfileEntity = await this.paginationService.paginate(count, take, profiles);
    return paginatedResult;

  }


  async findOne(id: string) {
    const profile = await this.prisma.profile.findUniqueOrThrow({
      where: { id },
    });
    return new ProfileEntity(profile);
  }

  async update(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.prisma.profile.update({
      where: { id },
      data: updateProfileDto,
    });
    return new ProfileEntity(profile);
  }

  async remove(id: string) {
    const profile = await this.prisma.profile.delete({
      where: { id },
    });
    return new ProfileEntity(profile);
  }
}
