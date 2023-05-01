import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const orderSchema = new Schema({
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
      unitPrice: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      totalPrice: {
        type: Number,
        required: true,
      },
    },
  ],
  totalOrderPrice: {
    type: Number,
    required: true,
  },
  invoiceAddress: {
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  deliveryAddress: {
    zipCode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    houseNumber: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  details: {
    phoneNumber: {
      type: String,
      required: true,
    },
    deliveryOption: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: Number,
      required: true,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type OrderType = InferSchemaType<typeof orderSchema>;
export const Order = mongoose.model('Order', orderSchema);
