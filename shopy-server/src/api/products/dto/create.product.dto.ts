import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { constants } from '../../../contants/constants';

export class CreateProductDto {
  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_NAME_DEFAULT,
  })
  @IsString()
  name: string;

  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_PRICE_DEFAULT,
  })
  @IsNumber()
  price: number;

  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_CURRENCY_DEFAULT,
  })
  @IsString()
  currency: string;

  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_QUANTITY_DEFAULT,
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
    default: constants.SWAGGER_PRODUCT_ID_DEFAULT,
  })
  @IsString()
  _id: string;

  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_USER_ID_DEFAULT,
  })
  @IsString()
  userId: string;

  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_IMAGE_URL_DEFAULT,
  })
  @IsString()
  imageUrl: string;
}
