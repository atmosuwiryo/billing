import { Injectable } from '@nestjs/common';
import { CreateTagihanDto } from './dto/create-tagihan.dto';
import { UpdateTagihanDto } from './dto/update-tagihan.dto';

@Injectable()
export class TagihanService {
  create(createTagihanDto: CreateTagihanDto) {
    return 'This action adds a new tagihan';
  }

  findAll() {
    return `This action returns all tagihan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tagihan`;
  }

  update(id: number, updateTagihanDto: UpdateTagihanDto) {
    return `This action updates a #${id} tagihan`;
  }

  remove(id: number) {
    return `This action removes a #${id} tagihan`;
  }
}
