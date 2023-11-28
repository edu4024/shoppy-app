import { Model } from 'mongoose';
import { constants } from '../contants/constants';

export abstract class BaseService<T> {
  private model: Model<T>;
  protected constructor(model: Model<any, any>) {
    this.model = model;
  }

  async find(criteria: object): Promise<T[]> {
    return this.model.find({ ...criteria });
  }

  async create(body: object): Promise<T> {
    return this.model.create(body);
  }

  async findAll(criteria: {
    skip: number;
    limit: number;
    sort: string | { key: string } | [string];
  }): Promise<object> {
    const {
      skip = constants.BASE_SERVICE_FIND_SKIP,
      limit = constants.BASE_SERVICE_FIND_LIMIT,
      sort = {},
      ...query
    } = criteria;
    const docs = await this.model
      .find(query)
      .sort(sort)
      .skip(Number(skip))
      .limit(Number(limit));
    const count = await this.model.count(query);
    return { docs, count };
  }

  async findOneAndUpdate(
    filter: object,
    update: object,
    options: object = { new: true },
  ): Promise<T> {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  async updateOne(
    filter: object,
    update: object,
    options: object = { upsert: true },
  ): Promise<object> {
    return this.model.updateOne(filter, update, options);
  }

  async remove(criteria: object): Promise<T> {
    return this.model.findOneAndRemove({ ...criteria });
  }
}
