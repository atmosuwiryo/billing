import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationRequestDto } from "../../../shared/dto/pagination-request.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum OrderBy {
  NAMA_PELANGGAN = 'namaPelanggan',
  NO_REGISTRASI = 'noRegistrasi',
  TGL_AKTIF = 'tglAktif',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class RequestProfileDto extends PaginationRequestDto {

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
    description: 'Filter by namaPelanggan',
    example: 'namaPelanggan',
  })
  @IsOptional()
  @IsString()
  namaPelanggan: string;

  @ApiPropertyOptional({
    description: 'Filter by noNIK',
    example: 'CN00001',
  })
  @IsOptional()
  @IsString()
  noNIK: string;

  @ApiPropertyOptional({
    description: 'Filter by noRegistrasi',
    example: 'CN00001',
  })
  @IsOptional()
  @IsString()
  noRegistrasi: string;

  @ApiPropertyOptional({
    description: 'Filter by alamat',
    example: 'alamat',
  })
  @IsOptional()
  @IsString()
  alamat: string;

  @ApiPropertyOptional({
    description: 'Filter by noWA',
    example: 'noWA',
  })
  @IsOptional()
  @IsString()
  noWA: string;
}
