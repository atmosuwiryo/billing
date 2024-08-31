import { ApiProperty } from "@nestjs/swagger";

export class PaginationResponseEntity {
  /**
   * @description
   * The count of the data.
   */
  @ApiProperty({
    description: 'Count of the data',
    example: 10
  })
    count: number;

  /**
   * @description
   * The next page url.
   */
  @ApiProperty({
    description: 'Next page url',
    example: 'http://localhost:3000/api/data?page=1',
    type: String ,
    nullable: true
  })
    next: string | null;

  /**
   * @description
   * The previous page url url.
   */
  @ApiProperty({
    description: 'Previous page url',
    example: 'http://localhost:3000/api/data?page=2',
    type: String ,
    nullable: true
  })
    previous: string | null;

}
