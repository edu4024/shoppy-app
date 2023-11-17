import { ApiProperty } from '@nestjs/swagger';

export class CriteriaDto {
  @ApiProperty()
  email: string;
}
