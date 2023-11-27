import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './config/generalConfiguration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
      cache: true,
    }),
  ],
})
export class ConfigModule {}
