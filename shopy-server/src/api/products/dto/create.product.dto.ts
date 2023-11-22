import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
  @ApiProperty({
    default: 'Sony PlayStation 5',
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: '15',
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    default: 'USD',
  })
  @IsString()
  currency: string;

  @ApiProperty({
    default: 10,
  })
  @IsNumber()
  quantity: number;

  @IsString()
  userId: string;

  @IsString()
  imageUrl: string;

  @ApiProperty({
    type: 'file',
  })
  @IsOptional()
  file?: {
    type: 'string';
    format: 'binary';
  };
}
export class ProductDto extends CreateProductDto {
  @ApiProperty({
    default: '655cedfd17b68c6090f9b88b',
  })
  @IsString()
  _id: string;

  @ApiProperty({
    default: '6554e7e69941b31b3b1b2755',
  })
  @IsString()
  userId: string;

  @ApiProperty({
    default: 'path to image',
  })
  @IsString()
  imageUrl: string;
}
