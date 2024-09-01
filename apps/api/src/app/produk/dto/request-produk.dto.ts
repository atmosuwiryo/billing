import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationRequestDto } from "../../../shared/dto/pagination-request.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { JenisDiskon } from "@prisma/client";


export enum OrderBy {
  NAMA = 'nama',
  DISKON = 'diskon',
  JENIS_DISKON = 'jenisDiskon',
  LAMA_WAKTU_DISKON = 'lamaWaktuDiskon',
  SATUAN_WAKTU_DISKON = 'satuanWaktuDiskon',
  TGL_MULAI_DISKON = 'tglMulaiDiskon',
  TGL_SELESAI_DISKON = 'tglSelesaiDiskon',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class RequestProdukDto extends PaginationRequestDto {

  @ApiProperty({
    description: 'Order by',
    enum: OrderBy,
    example: OrderBy.NAMA,
    default: OrderBy.CREATED_AT
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;


  @ApiPropertyOptional({
    description: 'Filter by nama',
    example: 'nama',
  })
  @IsOptional()
  @IsString()
  nama: string;

  @ApiPropertyOptional({
    description: 'Filter by jenisDiskon',
    enum: JenisDiskon,
    example: JenisDiskon.NOMINAL,
    default: JenisDiskon.NOMINAL
  })
  @IsOptional()
  @IsEnum(JenisDiskon)
  jenisDiskon: JenisDiskon;


  @ApiPropertyOptional({
    description: 'Filter by satuanWaktuDiskon',
    example: 'TAHUN',
  })
  @IsOptional()
  @IsString()
  satuanWaktuDiskon: string;


}
