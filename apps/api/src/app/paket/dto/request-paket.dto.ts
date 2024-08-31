import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationRequestDto } from "../../../shared/dto/pagination-request.dto";
import { IsBoolean, IsEnum, IsOptional, IsString } from "class-validator";
import { Transform } from "class-transformer";

export enum OrderBy {
  KECEPATAN = 'kecepatan',
  HARGA = 'harga',
  IS_LANGGANAN = 'isLangganan',
  IS_ACTIVE = 'isActive',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class RequestPaketDto extends PaginationRequestDto {

  @ApiProperty({
    description: 'Order by',
    enum: OrderBy,
    example: OrderBy.KECEPATAN,
    default: OrderBy.CREATED_AT
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;


  @ApiPropertyOptional({
    description: 'Filter by kecepatan',
    example: 'kecepatan',
  })
  @IsOptional()
  @IsString()
  kecepatan: string;

  @ApiPropertyOptional({
    description: 'Filter by isLangganan',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(( { value }) => value === 'true')
  isLangganan: boolean;

  @ApiPropertyOptional({
    description: 'Filter by isActive',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(( { value }) => value === 'true')
  isActive: boolean;

}
