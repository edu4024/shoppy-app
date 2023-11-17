import {
  Controller,
  HttpException,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CriteriaDto } from './dto/criteria.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { UserId } from '../../decorators/getUserId.decorator';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/')
  @ApiBearerAuth()
  async find(@UserId() userId, @Query() criteria: CriteriaDto) {
    try {
      return this.userService.find(criteria);
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
