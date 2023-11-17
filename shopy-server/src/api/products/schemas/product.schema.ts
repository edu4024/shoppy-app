import { Schema, Types, model } from 'mongoose';
import { UserSchema } from '../../users/schemas/user.schema';

export const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    userId: { type: Types.ObjectId, ref: 'Users' },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

ProductSchema.pre('save', async function (next) {
  const userModel = model('USER', UserSchema);
  const user = await userModel.findById(this.userId);
  if (user) {
    next();
  }
  next(new Error('Invalid user'));
});
