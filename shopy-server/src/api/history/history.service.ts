import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HistoryInterface } from './interfaces/history.interface';
import { BaseService } from '../../utils/BaseService';

@Injectable()
export class HistoryService extends BaseService<HistoryInterface> {
  constructor(
    @InjectModel('HISTORIES')
    private readonly historyModel: Model<HistoryInterface>,
  ) {
    super(historyModel);
  }
}
