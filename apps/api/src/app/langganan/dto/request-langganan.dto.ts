import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationRequestDto } from "../../../shared/dto/pagination-request.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";


export enum OrderBy {
  NAMA_PELANGGAN = 'namaPelanggan',
  NO_REGISTRASI = 'noRegistrasi',
  NAMA_PRODUK = 'namaProduk',
  TGL_MULAI = 'tglMulai',
  TGL_SELESAI = 'tglSelesai',
  STATUS = 'status',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class RequestLanggananDto extends PaginationRequestDto {

  @ApiProperty({
    description: 'Order by',
    enum: OrderBy,
    example: OrderBy.NAMA_PELANGGAN,
    default: OrderBy.CREATED_AT
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiPropertyOptional({
    description: 'Filter by nama pelanggan',
    example: 'nama pelanggan',
  })
  @IsOptional()
  @IsString()
  namaPelanggan: string;

  @ApiPropertyOptional({
    description: 'Filter by no registrasi',
    example: 'no registrasi',
  })
  @IsOptional()
  @IsString()
  noRegistrasi: string;

  @ApiPropertyOptional({
    description: 'Filter by nama produk',
    example: 'nama produk',
  })
  @IsOptional()
  @IsString()
  namaProduk: string;

  @ApiPropertyOptional({
    description: 'Filter by kecepatan',
    example: 'kecepatan',
  })
  @IsOptional()
  @IsString()
  kecepatan: string;

}
