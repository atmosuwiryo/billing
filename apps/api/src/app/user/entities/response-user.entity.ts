import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";
import { UserEntity } from "./user.entity";


export class ResponseUserEntity extends PaginationResponseEntity {
  @ApiProperty({
    description: 'List of user',
    type: [UserEntity]
  })
  results: UserEntity[]
}
