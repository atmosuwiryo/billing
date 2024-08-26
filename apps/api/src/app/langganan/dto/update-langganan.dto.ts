import { PartialType } from '@nestjs/mapped-types';
import { CreateLanggananDto } from './create-langganan.dto';

export class UpdateLanggananDto extends PartialType(CreateLanggananDto) {}
