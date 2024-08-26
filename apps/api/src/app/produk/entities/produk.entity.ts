import { ApiProperty } from "@nestjs/swagger";
import { JenisDiskon, Produk, SatuanWaktuDiskon } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

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

    nama: string;
    diskon: Decimal;
    jenisDiskon: JenisDiskon;
    lamaWaktuDiskon: number;
    satuanWaktuDiskon: SatuanWaktuDiskon;
    tglMulaiDiskon: Date | null;
    tglSelesaiDiskon: Date | null;
    paketId: string;

  constructor(partial: Partial<ProdukEntity>) {
    Object.assign(this, partial);
  }

}
