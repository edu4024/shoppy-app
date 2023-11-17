import { Model } from 'mongoose';

export abstract class BaseService<T> {
  private model: Model<T>;
  protected constructor(model: Model<any, any>) {
    this.model = model;
  }

  async find(criteria: object): Promise<any> {
    return this.model.find({ ...criteria });
  }

  async create(body: any): Promise<any> {
    return this.model.create(body);
  }

  async findAll(criteria: any): Promise<any> {
    const { skip, limit, sort = { createdAt: 1 }, ...query } = criteria;
    const docs = await this.model
      .find({ ...query })
      .sort(sort)
      .skip(Number(skip))
      .limit(Number(limit));
    const count = await this.model.count({ ...query });
    return { docs, count };
  }

  async findOneAndUpdate(
    filter: any,
    update: any,
    options = { new: true },
  ): Promise<any> {
    return this.model.findOneAndUpdate(filter, update, options);
  }

  async remove(criteria: any): Promise<any> {
    return this.model.findOneAndRemove({ ...criteria });
  }
}
