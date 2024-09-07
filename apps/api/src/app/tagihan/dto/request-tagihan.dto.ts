import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationRequestDto } from "../../../shared/dto/pagination-request.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";
import { StatusTagihan } from "@prisma/client";


export enum OrderBy {
  NAMA_PELANGGAN = 'namaPelanggan',
  NAMA_PRODUK = "namaProduk",
  TOTAL = 'total',
  TGL_PEMBAYARAN = 'tglPembayaran',
  STATUS = 'status',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class RequestTagihanDto extends PaginationRequestDto {

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
    description: 'Filter by nama produk',
    example: "nama produk",
  })
  @IsOptional()
  @IsString()
  namaProduk: string;

  @ApiPropertyOptional({
    description: 'Filter by status',
    enum: StatusTagihan,
    example: StatusTagihan.AKTIF,
    default: StatusTagihan.AKTIF
  })
  @IsOptional()
  @IsEnum(StatusTagihan)
  status: StatusTagihan;

}
