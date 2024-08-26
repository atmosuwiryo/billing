import { Injectable } from '@nestjs/common';
import { CreateLanggananDto } from './dto/create-langganan.dto';
import { UpdateLanggananDto } from './dto/update-langganan.dto';

@Injectable()
export class LanggananService {
  create(createLanggananDto: CreateLanggananDto) {
    return 'This action adds a new langganan';
  }

  findAll() {
    return `This action returns all langganan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} langganan`;
  }

  update(id: number, updateLanggananDto: UpdateLanggananDto) {
    return `This action updates a #${id} langganan`;
  }

  remove(id: number) {
    return `This action removes a #${id} langganan`;
  }
}
