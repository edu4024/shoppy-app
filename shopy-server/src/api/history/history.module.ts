import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { MongooseModule } from '@nestjs/mongoose';
import { HistorySchema } from './schemas/history.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'HISTORIES', schema: HistorySchema }]),
  ],
  controllers: [HistoryController],
  providers: [HistoryService],
  exports: [HistoryService],
})
export class HistoryModule {}
