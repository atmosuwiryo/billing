import { ProfileEntity } from "../../profile/entities/profile.entity";
import { UserEntity } from "./user.entity";

export class UserProfileEntity extends UserEntity {
  profile: ProfileEntity
}
