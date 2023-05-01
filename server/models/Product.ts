import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  price_sign: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: String,
  },
  category: {
    type: String,
  },
  product_type: {
    type: String,
    required: true,
  },
  api_featured_image: {
    type: String,
    required: true,
  },
});

export type ProductType = InferSchemaType<typeof productSchema>;
export const Product = mongoose.model('Product', productSchema);
