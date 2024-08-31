import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Omit } from "@prisma/client/runtime/library";
import { Exclude } from "class-transformer";

export class UserEntity implements Omit<User, 'password'> {
  /**
   * @description
   * The ID of the user.
   */
  @ApiProperty({
    description: 'The ID of the user.',
    example: 'tz4a98xxat96iws9zmbrgj3a',
  })
  id: string;

  /**
   * @description
   * The date and time when the user was created.
   */
  @ApiProperty({
    description: 'The date and time when the user was created.',
    example: '2022-01-01T00:00:00.000Z',
  })
  createdAt: Date;

  /**
   * @description
   * The date and time when the user was updated.
   */
  @ApiProperty({
    description: 'The date and time when the user was updated.',
    example: '2022-01-01T00:00:00.000Z',
  })
  updatedAt: Date;

  /**
   * @description
   * The username of the user.
   */
  @ApiProperty({
    description: 'The username of the user.',
    example: 'johndoe',
  })
  username: string;

  /**
   * @description
   * The email of the user.
   */
  @ApiProperty({
    description: 'The email of the user.',
    example: 'jHbD0@example.com',
  })
  email: string;

  /**
   * @description
   * The role of the user.
   */
  @ApiProperty({
    description: 'The role of the user.',
    example: true,
  })
  isAdmin: boolean;

  @Exclude()
  password: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
