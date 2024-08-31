import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Profile } from "@prisma/client";
import { IsAlphanumeric, IsDateString, IsMobilePhone, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateProfileDto implements Omit<Profile, 'id' | 'createdAt' | 'updatedAt'> {
  /**
   * @description
   * The name of the profile.
   */
  @ApiProperty({
    description: 'The name of the profile.',
    example: 'John Doe',
  })
  @IsString()
  namaPelanggan: string;

  /**
   * @description
   * The NIK of the profile.
   */
  @ApiProperty({
    description: 'The NIK of the profile.',
    example: '1234567890123456',
  })
  @IsNumberString()
  noNIK: string;

  /**
   * @description
   * The registration number of the profile.
   */
  @ApiProperty({
    description: 'The registration number of the profile.',
    example: 'CN123456',
  })
  @IsAlphanumeric()
  noRegistrasi: string;

  /**
   * @description
   * The address of the profile.
   */
  @ApiProperty({
    description: 'The address of the profile.',
    example: 'Jalan Jalan',
  })
  @IsString()
  alamat: string;

  /**
   * @description
   * The phone number of the profile.
   */
  @ApiProperty({
    description: 'The phone number of the profile.',
    example: '081234567890',
  })
  @IsMobilePhone()
  noWA: string;

  /**
   * @description
   * The activation date of the profile.
   */
  @ApiProperty({
    description: 'The activation date of the profile.',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsDateString()
  tglAktif: Date;

  /**
   * @description
   * The expiration date of the profile.
   */
  @ApiPropertyOptional({
    description: 'The expiration date of the profile.',
    example: '2022-01-01T00:00:00.000Z',
  })
  @IsDateString()
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
  @IsString()
  userId: string;

}
