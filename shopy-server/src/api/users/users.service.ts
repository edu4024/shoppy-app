import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserInterface } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create.user.dto';
import { BaseService } from '../../utils/BaseService';

@Injectable()
export class UsersService extends BaseService<UserInterface> {
  constructor(
    @InjectModel('USERS')
    private readonly userModel: Model<UserInterface>,
  ) {
    super(userModel);
  }

  async create(createUserDto: CreateUserDto): Promise<UserInterface> {
    return super.create(createUserDto);
  }
}
