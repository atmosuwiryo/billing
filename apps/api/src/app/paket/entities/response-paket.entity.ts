import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";
import { PaketEntity } from "./paket.entity";


export class ResponsePaketEntity extends PaginationResponseEntity {
  @ApiProperty({
    description: 'List of paket',
    type: [PaketEntity]
  })
  results: PaketEntity[]
}
