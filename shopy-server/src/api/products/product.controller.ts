import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto, ProductDto } from './dto/create.product.dto';
import { UserId } from '../../decorators/getUserId.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FindProductByIdDto, FindProductDto } from './dto/find.product.dto';

@Controller('products')
@ApiTags('products')
@ApiBearerAuth()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/')
  @HttpCode(201)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  async create(
    @Body() createProductDto: CreateProductDto,
    @UserId() userId,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.productService.createProduct(createProductDto, userId, file);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }
  }

  @Patch('/:id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadProductImage(
    @Query() param: FindProductByIdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.productService.updateImage(file, param);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }
  }

  @Get('/:_id')
  @HttpCode(200)
  async findById(@Param() param: FindProductByIdDto) {
    try {
      return this.productService.find(param);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Get('/')
  @HttpCode(200)
  async find(@Query() query: FindProductDto, @UserId() userId: string) {
    try {
      const { my, ...criteria } = query;
      if (Boolean(JSON.parse(my))) {
        criteria.userId = { $eq: userId };
      }
      return await this.productService.getProducts(criteria);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Delete('/:_id')
  @HttpCode(204)
  async remove(@Param() param: FindProductByIdDto) {
    try {
      return this.productService.remove(param);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Put('/:_id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('application/json', 'multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  async update(
    @Param() param: FindProductByIdDto,
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return this.productService.updateProduct(param, createProductDto, file);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: err.message,
        },
        HttpStatus.NOT_FOUND,
        {
          cause: err,
        },
      );
    }
  }

  @Post('/checkout')
  @HttpCode(200)
  @ApiConsumes('application/json')
  @ApiBody({ type: [ProductDto] })
  async checkout(@Body() cartProducts: ProductDto[], @UserId() userId) {
    try {
      return this.productService.checkout(cartProducts, userId);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: err.message,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: err,
        },
      );
    }
  }
}
