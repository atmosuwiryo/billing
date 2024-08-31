import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Profile } from "@prisma/client";
import { IsOptional } from "class-validator";

export class ProfileEntity implements Profile {
  /**
   * @description
   * The ID of the profile.
   */
  @ApiProperty({
    description: 'The ID of the profile.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  id: string;

  /**
   * @description
   * The date and time when the profile was created.
   */
  @ApiProperty({
    description: 'The date and time when the profile was created.',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * @description
   * The date and time when the profile was updated.
   */
  @ApiProperty({
    description: 'The date and time when the user was updated.',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  /**
   * @description
   * The name of the profile.
   */
  @ApiProperty({
    description: 'The name of the profile.',
    example: 'John Doe',
  })
  namaPelanggan: string;

  /**
   * @description
   * The NIK of the profile.
   */
  @ApiProperty({
    description: 'The NIK of the profile.',
    example: '1234567890123456',
  })
  noNIK: string;

  /**
   * @description
   * The registration number of the profile.
   */
  @ApiProperty({
    description: 'The registration number of the profile.',
    example: 'CN123456',
  })
  noRegistrasi: string;

  /**
   * @description
   * The address of the profile.
   */
  @ApiProperty({
    description: 'The address of the profile.',
    example: 'Jalan Jalan',
  })
  alamat: string;

  /**
   * @description
   * The phone number of the profile.
   */
  @ApiProperty({
    description: 'The phone number of the profile.',
    example: '081234567890',
  })
  noWA: string;

  /**
   * @description
   * The activation date of the profile.
   */
  @ApiProperty({
    description: 'The activation date of the profile.',
    example: '2022-01-01T00:00:00.000Z',
  })
  tglAktif: Date;

  /**
   * @description
   * The expiration date of the profile.
   */
  @ApiPropertyOptional({
    description: 'The expiration date of the profile.',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsOptional()
  tglExp: Date | null;

  /**
   * @description
   * The ID of the user.
   */
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  userId: string

  constructor(partial: Partial<Profile>) {
    Object.assign(this, partial);
  }
}
