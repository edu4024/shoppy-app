import { Module } from '@nestjs/common';
import { ConfigModule } from './config.module';
import { UsersModule } from './api/users/users.module';
import { MongoModule } from './mongodb/mongo.module';
import { AuthModule } from './api/auth/auth.module';
import { ProductModule } from './api/products/product.module';
import { HistoryModule } from './api/history/history.module';

@Module({
  imports: [
    ConfigModule,
    MongoModule,
    AuthModule,
    UsersModule,
    ProductModule,
    HistoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
