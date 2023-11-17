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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create.product.dto';
import { UserId } from '../../decorators/getUserId.decorator';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
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

  @Get('/:id')
  @HttpCode(200)
  async findById(@Query() param: FindProductByIdDto) {
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
      return await this.productService.findAll(criteria);
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

  @Delete('/:id')
  @HttpCode(204)
  async remove(@Query() param: FindProductByIdDto) {
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

  @Put('/:id')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor(''))
  async update(
    @Query() param: FindProductByIdDto,
    @Body() createProductDto: CreateProductDto,
  ) {
    try {
      return this.productService.findOneAndUpdate(param, createProductDto);
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
}
