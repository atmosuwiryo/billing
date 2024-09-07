import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";
import { LanggananEntity } from "./langganan.entity";


export class ResponseLanggananEntity extends PaginationResponseEntity {
  @ApiProperty({
    description: 'List of langganan',
    type: [LanggananEntity]
  })
  results: LanggananEntity[]
}
