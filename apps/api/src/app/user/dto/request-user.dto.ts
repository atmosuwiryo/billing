import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PaginationRequestDto } from "../../../shared/dto/pagination-request.dto";
import { IsEnum, IsOptional, IsString } from "class-validator";

export enum OrderBy {
  USERNAME = 'username',
  EMAIL = 'email',
  IS_ADMIN = 'isAdmin',
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
}

export class RequestUserDto extends PaginationRequestDto {

  @ApiProperty({
    description: 'Order by',
    enum: OrderBy,
    example: OrderBy.USERNAME,
    default: OrderBy.CREATED_AT
  })
  @ApiPropertyOptional()
  @IsOptional()
  @IsEnum(OrderBy)
  orderBy?: OrderBy;

  @ApiPropertyOptional({
    description: 'Filter by username',
    example: 'username',
  })
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional({
    description: 'Filter by email',
    example: 'email',
  })
  @IsOptional()
  @IsString()
  email: string;
}
