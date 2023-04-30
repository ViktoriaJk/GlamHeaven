import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        required: true,
      },
      unitPrice: {
        type: Number,
        default: 0,
        required: true,
      },
      totalPrice: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
  totalCartPrice: {
    type: Number,
    required: true,
  },
});

export type CartType = InferSchemaType<typeof cartSchema>;
export const Cart = mongoose.model('Cart', cartSchema);
