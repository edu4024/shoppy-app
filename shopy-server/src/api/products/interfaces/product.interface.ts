import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  readonly name: string;
  readonly price: number;
  readonly currency: string;
  readonly quantity: number;
  readonly userId: string;
  readonly imageUrl: string;
}
