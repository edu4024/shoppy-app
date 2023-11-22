import { Document } from 'mongoose';

export interface HistoryInterface extends Document {
  readonly userId: string;
  readonly products: {
    readonly name: string;
    readonly price: number;
    readonly imageUrl: string;
    readonly date: string;
  };
}
