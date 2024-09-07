import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../services/prisma.service';
import { PaginationService } from '../../services/pagination.service';
import { UserEntity } from './entities/user.entity';
import { ResponseUserEntity } from './entities/response-user.entity';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private paginationService: PaginationService<UserEntity>
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    return new UserEntity(user);
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
            { username: { contains: filter['search'], mode: 'insensitive' } },
            { email: { contains: filter['search'], mode: 'insensitive' } },
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

      if ('username' in filter) {
        isQueryFilter = true;
        queryFilter.push({ username: { contains: filter['username'], mode: 'insensitive' } });
      }

      if ('email' in filter) {
        isQueryFilter = true;
        queryFilter.push({ email: { contains: filter['email'], mode: 'insensitive' } });
      }


      if (isQueryFilter) {
        query['where'] = { AND: queryFilter };
      }

    }

    const prismaQuery = this.prisma.user.findMany(query);

    const [results, count] = await this.prisma.$transaction([
      prismaQuery, this.prisma.user.count({ where: query.where }),
    ]);

    const users = results.map(user => {
      return new UserEntity(user);
    });

    const paginatedResult: ResponseUserEntity = await this.paginationService.paginate(count, take, users);
    return paginatedResult;

  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return new UserEntity(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
    return new UserEntity(user);
  }

  async remove(id: string) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    return new UserEntity(user);
  }
}
