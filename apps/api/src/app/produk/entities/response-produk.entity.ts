import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";
import { ProdukEntity } from "./produk.entity";


export class ResponseProdukEntity extends PaginationResponseEntity {
  @ApiProperty({
    description: 'List of produk',
    type: [ProdukEntity]
  })
  results: ProdukEntity[]
}
