import { IsNumber, IsString, IsObject, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { constants } from '../../../contants/constants';

export class FindProductByIdDto {
  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_ID_DEFAULT,
  })
  @IsString()
  _id: string;
}

export class FindProductDto {
  @ApiProperty({
    default: constants.SWAGGER_PRODUCT_IS_MY_DEFAULT,
  })
  @IsOptional()
  @IsString()
  my: string;

  @ApiProperty({
    default: constants.BASE_SERVICE_FIND_SKIP,
  })
  @IsOptional()
  @IsNumber()
  skip?: number;

  @ApiProperty({
    default: constants.BASE_SERVICE_FIND_LIMIT,
  })
  @IsOptional()
  @IsNumber()
  limit?: number;

  @ApiProperty({
    default: constants.BASE_SERVICE_FIND_SORT,
  })
  @IsOptional()
  @IsObject()
  sort?: object;

  @IsOptional()
  @IsObject()
  userId?: object;
}
