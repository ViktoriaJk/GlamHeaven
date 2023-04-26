import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
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
    },
  ],
});

export type CartType = InferSchemaType<typeof cartSchema>;
export const Cart = mongoose.model('Cart', cartSchema);
