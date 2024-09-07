import { ApiProperty } from '@nestjs/swagger';
import { Paket, Prisma } from '@prisma/client';
import { Transform } from 'class-transformer';

export class PaketEntity implements Paket {
  /**
   * @description
   * The ID of the package.
   */
  @ApiProperty({
    description: 'The ID of the package.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  id: string;

  /**
   * @description
   * The date and time when the package was created.
   */
  @ApiProperty({
    description: 'The date and time when the package was created.',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * @description
   * The date and time when the package was last updated.
   */
  @ApiProperty({
    description: 'The date and time when the package was last updated.',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  /**
   * @description
   * The speed of the package.
   */
  @ApiProperty({
    description: 'The speed of the package.',
    example: '100 Mbps',
  })
  kecepatan: string;

  /**
   * @description
   * The price of the package.
   */
  @ApiProperty({
    description: 'The price of the package.',
    example: '199.99',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  @Transform(( { value }) => value.toFixed(2))
  harga: Prisma.Decimal;

  /**
   * @description
   * Indicates if the package is a subscription.
   */
  @ApiProperty({
    description: 'Indicates if the package is a subscription.',
    example: true,
  })
  isLangganan: boolean;

  /**
   * @description
   * Indicates if the package is active.
   */
  @ApiProperty({
    description: 'Indicates if the package is active.',
    example: true,
  })
  isActive: boolean;

  constructor(paket: Partial<Paket>) {
    Object.assign(this, paket);
  }
}
