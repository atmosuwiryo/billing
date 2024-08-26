import { ApiProperty } from '@nestjs/swagger';
import { JenisDiskon, Produk, SatuanWaktuDiskon } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class CreateProdukDto implements Omit<Produk, 'id' | 'createdAt' | 'updatedAt'> {
  /**
   * @description
   * The name of the product.
   */
  @ApiProperty({
    description: 'The name of the product.',
    example: 'Premium Package',
  })
  nama: string;

  /**
   * @description
   * The discount applied to the product.
   */
  @ApiProperty({
    description: 'The discount applied to the product.',
    example: '10.00',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  diskon: Decimal;

  /**
   * @description
   * The type of discount applied.
   */
  @ApiProperty({
    description: 'The type of discount applied.',
    enum: JenisDiskon,
    example: JenisDiskon.PERSENTASE,
  })
  jenisDiskon: JenisDiskon;

  /**
   * @description
   * The duration of the discount.
   */
  @ApiProperty({
    description: 'The duration of the discount.',
    example: 30,
  })
  lamaWaktuDiskon: number;

  /**
   * @description
   * The unit of time for the discount duration.
   */
  @ApiProperty({
    description: 'The unit of time for the discount duration.',
    enum: SatuanWaktuDiskon,
    example: SatuanWaktuDiskon.TAHUN,
  })
  satuanWaktuDiskon: SatuanWaktuDiskon;

  /**
   * @description
   * The start date of the discount.
   */
  @ApiProperty({
    description: 'The start date of the discount.',
    example: '2024-09-01T00:00:00Z',
    nullable: true,
  })
  tglMulaiDiskon: Date | null;

  /**
   * @description
   * The end date of the discount.
   */
  @ApiProperty({
    description: 'The end date of the discount.',
    example: '2024-09-30T00:00:00Z',
    nullable: true,
  })
  tglSelesaiDiskon: Date | null;

  /**
   * @description
   * The ID of the related package.
   */
  @ApiProperty({
    description: 'The ID of the related package.',
    example: 'pkg1234567890',
  })
  paketId: string;
}
