import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";
import { ProfileEntity } from "./profile.entity";


export class ResponseProfileEntity extends PaginationResponseEntity {
  @ApiProperty({
    description: 'List of profile',
    type: [ProfileEntity]
  })
  results: ProfileEntity[]
}
