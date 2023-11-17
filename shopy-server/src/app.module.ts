import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { UsersModule } from './api/users/users.module';
import { MongoModule } from './mongodb/mongo.module';
import { AuthModule } from './api/auth/auth.module';
import { ProductModule } from './api/products/product.module';

@Module({
  imports: [ConfigModule, MongoModule, AuthModule, UsersModule, ProductModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
