import { Schema, Types } from 'mongoose';

export const HistorySchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'Users',
      index: true,
    },
    products: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        imageUrl: {
          type: String,
          required: false,
        },
        date: {
          type: Date,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);
