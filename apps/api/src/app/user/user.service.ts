import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../services/prisma.service';
import { PaginationService } from '../../services/pagination.service';
import { UserEntity } from './entities/user.entity';

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

  findAll() {
    return `This action returns all user`;
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
