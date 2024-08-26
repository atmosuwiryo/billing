import { ApiProperty } from "@nestjs/swagger"
import { User } from "@prisma/client"
import { IsBoolean, IsEmail, IsString, IsStrongPassword } from "class-validator"

/**
 * @description
 * DTO for creating a user.
 */
export class CreateUserDto implements Omit<User , 'id' | 'createdAt' | 'updatedAt'> {
  /**
   * @description
   * The full name of the user.
   */
  @ApiProperty({
    description: 'The full name of the user.',
    example: 'John Doe',
  })
  @IsString()
  name: string

  /**
   * @description
   * The username of the user.
   */
  @ApiProperty({
    description: 'The username of the user.',
    example: 'johndoe',
  })
  @IsString()
  username: string

  /**
   * @description
   * The email of the user.
   */
  @ApiProperty({
    description: 'The email of the user.',
    example: 'johndoe@me.com',
  })
  @IsEmail()
  email: string

  /**
   * @description
   * The password of the user.
   */
  @ApiProperty({
    description: 'The password of the user.',
    example: 'password@123',
  })
  @IsStrongPassword()
  password: string

  /**
   * @description
   * Is the user an admin?
   */
  @ApiProperty({
    description: 'Is the user an admin?',
    example: true,
  })
  @IsBoolean()
  isAdmin: boolean
}
