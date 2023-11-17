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
