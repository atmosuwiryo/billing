import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";
import { Exclude, Transform } from "class-transformer";
import { UserEntity } from "./user.entity";
import { ProfileEntity } from "../../profile/entities/profile.entity";

export class UserProfileEntity extends UserEntity {
  @ApiProperty({
    description: 'The profile of the user.',
    type: () => ProfileEntity
  })
  @Transform(({ value }) => value ? new ProfileEntity(value) : null)
  profile: ProfileEntity;

  @Exclude()
  profileId: string;

  constructor(partial: Partial<User>) {
    super(partial);
    Object.assign(this, partial);
  }
}
