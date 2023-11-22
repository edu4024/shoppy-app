import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  HttpCode,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from '../../decorators/getUserId.decorator';
import { HistoryService } from './history.service';

@Controller('history')
@ApiTags('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Get('/')
  @HttpCode(200)
  @ApiBearerAuth()
  async find(@UserId() userId: string) {
    try {
      return await this.historyService.findAll({ userId: { $eq: userId } });
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
