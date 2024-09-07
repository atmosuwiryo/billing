import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";
import { TagihanEntity } from "./tagihan.entity";


export class ResponseTagihanEntity extends PaginationResponseEntity {
  @ApiProperty({
    description: 'List of tagihan',
    type: [TagihanEntity]
  })
  results: TagihanEntity[]
}
