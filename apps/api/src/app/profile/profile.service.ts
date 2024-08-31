import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileEntity } from './entities/profile.entity';
import { PrismaService } from '../../services/prisma.service';

@Injectable()
export class ProfileService {
  constructor(
    private prisma: PrismaService
  ) {}
  async create(createProfileDto: CreateProfileDto) {
    const profile = await this.prisma.profile.create({
      data: createProfileDto,
    });
    return new ProfileEntity(profile);
  }

  findAll() {
    return `This action returns all profile`;
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
