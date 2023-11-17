import { Document } from 'mongoose';

enum Currency {
  USD = 'USD',
  EUR = 'EUR',
}

export interface ProductInterface extends Document {
  readonly name: string;
  readonly price: number;
  readonly currency: Currency;
  readonly quantity: number;
  readonly userId: string;
  readonly imageUrl: string;
}
