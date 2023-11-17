import { IsNumber, IsString, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class FindProductByIdDto {
  @ApiProperty({
    default: '6555f948e22d7ccc516e34f5',
  })
  @IsString()
  _id: string;
}

export class FindProductDto {
  @ApiProperty({
    default: false,
  })
  @IsOptional()
  @IsString()
  my: string;

  @ApiProperty({
    default: 0,
  })
  @IsOptional()
  @IsNumber()
  skip?: number;

  @ApiProperty({
    default: 5,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    default: { createdAt: 1 },
  })
  @IsOptional()
  @IsObject()
  sort?: object;

  @IsOptional()
  @IsObject()
  userId?: object;
}
