import { ApiProperty } from "@nestjs/swagger";
import { Langganan, StatusLangganan } from "@prisma/client";
import { Transform } from "class-transformer";
import { ProdukEntity } from "../../produk/entities/produk.entity";
import { UserProfileEntity } from "../../user/entities/user-profile.entity";

export class LanggananEntity implements Langganan {
  /**
   * @description
   * The ID of the subscription.
   */
  @ApiProperty({
    description: 'The ID of the subscription.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  id: string;

  /**
   * @description
   * The date and time when the subscription was created.
   */
  @ApiProperty({
    description: 'The date and time when the subscription was created.',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * @description
   * The date and time when the subscription was last updated.
   */
  @ApiProperty({
    description: 'The date and time when the subscription was last updated.',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  /**
   * @description
   * The ID of the user.
   */
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'user1234567890',
  })
  userId: string;

  /**
   * @description
   * The ID of the product.
   */
  @ApiProperty({
    description: 'The ID of the product.',
    example: 'prod1234567890',
  })
  produkId: string;

  /**
   * @description
   * The start date of the subscription in ISO 8601 format.
   */
  @ApiProperty({
    description: 'The start date of the subscription in ISO 8601 format.',
    example: '2024-08-01T00:00:00Z',
  })
  tglMulai: Date;

  /**
   * @description
   * The end date of the subscription in ISO 8601 format.
   */
  @ApiProperty({
    description: 'The end date of the subscription in ISO 8601 format.',
    example: '2025-08-01T00:00:00Z',
  })
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
  status: StatusLangganan;

  /**
   * @description
   * The user of the subscription.
   */
  @ApiProperty({
    description: 'The user of the subscription.',
    type: () => UserProfileEntity
  })
  @Transform(({ value }) => value ? new UserProfileEntity(value) : null)
  user: UserProfileEntity;

  /**
   * @description
   * The product of the subscription.
   */
  @ApiProperty({
    description: 'The product of the subscription.',
  })
  @Transform(({ value }) => value ? new ProdukEntity(value) : null)
  produk: ProdukEntity;

  constructor(langganan: Partial<Langganan>) {
    Object.assign(this, langganan);
  }
}
