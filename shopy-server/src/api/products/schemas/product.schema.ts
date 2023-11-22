import { Schema, Types } from 'mongoose';

export const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
    },
    userId: {
      type: Types.ObjectId,
      ref: 'Users',
      index: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);
ProductSchema.index({ name: 'text' });

ProductSchema.pre('save', async function (next) {
  const userModel = this.model('USERS');
  try {
    await userModel.findById(this.userId);
    next();
  } catch (err) {
    console.log(err);
    next(new Error('Invalid user'));
  }
});
