import { Injectable, Inject } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseService } from '../../utils/BaseService';
import { ProductInterface } from './interfaces/product.interface';
import { CreateProductDto, ProductDto } from './dto/create.product.dto';
import { FirebaseStorageProvider } from '../../providers/firebase-storage.provider';
import { InjectConnection } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HistoryService } from '../history/history.service';

@Injectable()
export class ProductService extends BaseService<ProductInterface> {
  constructor(
    @InjectModel('PRODUCTS')
    private readonly productModel: Model<ProductInterface>,
    private storageProvider: FirebaseStorageProvider,
    @InjectConnection() private readonly connection: mongoose.Connection,
    @Inject(HistoryService)
    private readonly historyService: HistoryService,
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

  async updateImage(file, param): Promise<object> {
    const filePath = await this.storageProvider.upload(file, param._id);
    return super.findOneAndUpdate(param, { imageUrl: filePath });
  }

  async getProducts(criteria): Promise<object> {
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

  async checkout(cartProducts: ProductDto[], userId: string) {
    const transactionSession = await this.connection.startSession();
    transactionSession.startTransaction();
    try {
      const checkOrder = await Promise.allSettled(
        cartProducts.map(async (cartProduct: ProductDto) => {
          return this.productModel.findOneAndUpdate(
            {
              _id: cartProduct._id,
              quantity: { $gte: cartProduct.quantity },
            },
            {
              $inc: {
                quantity: -cartProduct.quantity,
              },
            },
            { new: true },
          );
        }),
      );

      checkOrder.forEach((item: any) => {
        if (!item.value) throw new Error('Transaction error');
      });

      const date = new Date().toISOString();
      const products = cartProducts.map((product: CreateProductDto) => {
        const { name, price, imageUrl } = product;
        return {
          name,
          price,
          imageUrl,
          date,
        };
      });
      await this.historyService.create({ userId: userId, products });

      await transactionSession.commitTransaction();
    } catch (error) {
      await transactionSession.abortTransaction();
      throw error;
    } finally {
      await transactionSession.endSession();
    }
  }
}
