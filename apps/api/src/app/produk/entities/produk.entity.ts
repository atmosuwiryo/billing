import { ApiProperty } from "@nestjs/swagger";
import { JenisDiskon, Produk, SatuanWaktuDiskon } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";
import { Transform } from "class-transformer";

export class ProdukEntity implements Produk {
  /**
   * @description
   * The ID of the product.
   */
  @ApiProperty({
    description: 'The ID of the product.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  id: string;

  /**
   * @description
   * The date and time when the product was created.
   */
  @ApiProperty({
    description: 'The date and time when the product was created.',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * @description
   * The date and time when the product was last updated.
   */
  @ApiProperty({
    description: 'The date and time when the product was last updated.',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  /**
   * @description
   * The name of the product.
   */
  @ApiProperty({
    description: 'The name of the product.',
    example: 'Product 1',
  })
  nama: string;

  /**
   * @description
   * The discount of the product.
   */
  @ApiProperty({
    description: 'The discount of the product.',
    example: '199.99',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  @Transform(( { value }) => value.toFixed(2))
  diskon: Decimal;

  /**
   * @description
   * The type of discount of the product.
   */
  @ApiProperty({
    description: 'The type of discount of the product.',
    enum: JenisDiskon,
    example: JenisDiskon.NOMINAL,
  })
  jenisDiskon: JenisDiskon;

  /**
   * @description
   * The duration of the discount of the product.
   */
  @ApiProperty({
    description: 'The duration of the discount of the product.',
    example: 1,
  })
  lamaWaktuDiskon: number;

  /**
   * @description
   * The unit of the duration of the discount of the product.
   */
  @ApiProperty({
    description: 'The unit of the duration of the discount of the product.',
    enum: SatuanWaktuDiskon,
    example: SatuanWaktuDiskon.HARI,
  })
  satuanWaktuDiskon: SatuanWaktuDiskon;

  /**
   * @description
   * The start date of the discount of the product.
   */
  @ApiProperty({
    description: 'The start date of the discount of the product.',
    example: '2022-01-01T00:00:00.000Z',
  })
  tglMulaiDiskon: Date | null;

  /**
   * @description
   * The end date of the discount of the product.
   */
  @ApiProperty({
    description: 'The end date of the discount of the product.',
    example: '2022-01-01T00:00:00.000Z',
  })
  tglSelesaiDiskon: Date | null;

  /**
   * @description
   * The ID of the package.
   */
  @ApiProperty({
    description: 'The ID of the package.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  paketId: string;

  constructor(partial: Partial<ProdukEntity>) {
    Object.assign(this, partial);
  }

}
