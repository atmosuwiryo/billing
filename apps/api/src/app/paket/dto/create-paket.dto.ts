import { ApiProperty } from '@nestjs/swagger';
import { Paket } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { IsString, IsBoolean, IsDecimal } from 'class-validator';

export class CreatePaketDto implements Omit<Paket, 'id' | 'createdAt' | 'updatedAt'> {

  /**
   * @description
   * The speed of the package.
   */
  @ApiProperty({
    description: 'The speed of the package.',
    example: '100 Mbps',
  })
  @IsString()
  kecepatan: string;

  /**
   * @description
   * The price of the package.
   */
  @ApiProperty({
    description: 'The price of the package.',
    example: '199.99',
    type: 'string', // Since Decimal is not directly supported by Swagger, we document it as a string.
  })
  @IsDecimal()
  harga: Decimal;

  /**
   * @description
   * Indicates if the package is a subscription.
   */
  @ApiProperty({
    description: 'Indicates if the package is a subscription.',
    example: true,
  })
  @IsBoolean()
  isLangganan: boolean;

  /**
   * @description
   * Indicates if the package is active.
   */
  @ApiProperty({
    description: 'Indicates if the package is active.',
    example: true,
  })
  @IsBoolean()
  isActive: boolean;
}
