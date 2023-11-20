import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../utils/BaseService';
import { ProductInterface } from './interfaces/product.interface';
import { CreateProductDto } from './dto/create.product.dto';
import { FirebaseStorageProvider } from '../../providers/firebase-storage.provider';

@Injectable()
export class ProductService extends BaseService<ProductInterface> {
  constructor(
    @InjectModel('PRODUCTS')
    private readonly productModel: Model<ProductInterface>,
    private storageProvider: FirebaseStorageProvider,
  ) {
    super(productModel);
  }

  async createProduct(
    createProductDto: CreateProductDto,
    userId: string,
    file: Express.Multer.File,
  ): Promise<ProductInterface> {
    if (file) {
      createProductDto.imageUrl = await this.storageProvider.upload(
        file,
        userId,
      );
    }
    return super.create({ ...createProductDto, userId: userId });
  }

  async updateImage(file, param): Promise<any> {
    const filePath = await this.storageProvider.upload(file, param._id);
    return super.findOneAndUpdate(param, { imageUrl: filePath });
  }

  async getProducts(criteria): Promise<any> {
    const { skip, limit, sort = { createdAt: -1 }, ...query } = criteria;
    return super.findAll({ skip, limit, sort, ...query });
  }

  async updateProduct(
    userId: { _id: string },
    createProductDto: CreateProductDto,
    file: Express.Multer.File,
  ): Promise<ProductInterface> {
    if (file) {
      createProductDto.imageUrl = await this.storageProvider.upload(
        file,
        userId._id,
      );
    }
    return super.findOneAndUpdate(userId, createProductDto);
  }
}
