import { ApiProperty } from '@nestjs/swagger';
import { Langganan, StatusLangganan } from '@prisma/client';
import { IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateLanggananDto implements Omit<Langganan, 'id' | 'createdAt' | 'updatedAt'> {

  /**
   * @description
   * The ID of the user.
   */
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  @IsString()
  userId: string;

  /**
   * @description
   * The ID of the product.
   */
  @ApiProperty({
    description: 'The ID of the product.',
    example: 'prod1234567890',
  })
  @IsString()
  produkId: string;

  /**
   * @description
   * The start date of the subscription in ISO 8601 format.
   */
  @ApiProperty({
    description: 'The start date of the subscription in ISO 8601 format.',
    example: '2024-08-01T00:00:00Z',
  })
  @IsDateString()
  tglMulai: Date;

  /**
   * @description
   * The end date of the subscription in ISO 8601 format.
   */
  @ApiProperty({
    description: 'The end date of the subscription in ISO 8601 format.',
    example: '2025-08-01T00:00:00Z',
  })
  @IsDateString()
  tglSelesai: Date;

  /**
   * @description
   * The status of the subscription.
   */
  @ApiProperty({
    description: 'The status of the subscription.',
    example: StatusLangganan.AKTIF,
    enum: StatusLangganan,
  })
  @IsEnum(StatusLangganan)
  status: StatusLangganan;
}
