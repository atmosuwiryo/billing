import { Type } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";
import { PaginationResponseEntity } from "../../../shared/entities/pagination-response.entity";

// Workaround for type of generic
export function ResponseUserEntity<T>(classRef: T): Type<PaginationResponseEntity<T>> {
  class ResponsUserEntityImpl extends PaginationResponseEntity<T> {
    @ApiProperty({
      description: 'Results of the data',
      type: [classRef]
    })
    results: T[]
  }
  return ResponsUserEntityImpl
}
