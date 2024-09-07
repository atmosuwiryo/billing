import { ApiProperty } from '@nestjs/swagger';
import { StatusTagihan, Tagihan } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';

export class TagihanEntity implements Tagihan {
  /**
   * @description
   * The ID of the invoice.
   */
  @ApiProperty({
    description: 'The ID of the invoice.',
    example: 'inv1234567890',
  })
  id: string;

  /**
   * @description
   * The date and time when the invoice was created.
   */
  @ApiProperty({
    description: 'The date and time when the invoice was created.',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * @description
   * The date and time when the invoice was last updated.
   */
  @ApiProperty({
    description: 'The date and time when the invoice was last updated.',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  /**
   * @description
   * The ID of the subscription associated with the invoice.
   */
  @ApiProperty({
    description: 'The ID of the subscription associated with the invoice.',
    example: 'langganan1234567890',
  })
  langgananId: string;

  /**
   * @description
   * The nominal amount of the invoice.
   */
  @ApiProperty({
    description: 'The nominal amount of the invoice.',
    example: '500000.00',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  nominal: Decimal;

  /**
   * @description
   * The discount applied to the invoice.
   */
  @ApiProperty({
    description: 'The discount applied to the invoice.',
    example: '50000.00',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  diskon: Decimal;

  /**
   * @description
   * The tax applied to the invoice.
   */
  @ApiProperty({
    description: 'The tax applied to the invoice.',
    example: '50000.00',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  pajak: Decimal;

  /**
   * @description
   * The total amount of the invoice after applying discount and tax.
   */
  @ApiProperty({
    description: 'The total amount of the invoice after applying discount and tax.',
    example: '500000.00',
    type: 'string', // Documenting Decimal as a string in Swagger.
  })
  total: Decimal;

  /**
   * @description
   * The payment date of the invoice.
   */
  @ApiProperty({
    description: 'The payment date of the invoice.',
    example: '2024-08-01T00:00:00Z',
  })
  tglPembayaran: Date;

  /**
   * @description
   * The start date of the billing period.
   */
  @ApiProperty({
    description: 'The start date of the billing period.',
    example: '2024-07-01T00:00:00Z',
  })
  tglMulai: Date;

  /**
   * @description
   * The end date of the billing period.
   */
  @ApiProperty({
    description: 'The end date of the billing period.',
    example: '2024-07-31T00:00:00Z',
  })
  tglSelesai: Date;

  /**
   * @description
   * The status of the invoice.
   */
  @ApiProperty({
    description: 'The status of the invoice.',
    enum: StatusTagihan,
    example: 'PENDING',
  })
  status: StatusTagihan;

  constructor(partial: Partial<Tagihan>) {
    Object.assign(this, partial);
  }
}
