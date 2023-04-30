import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const productSchema = new Schema({
  id: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
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
  },
  image_link: {
    type: String,
    required: true,
  },
  product_link: {
    type: String,
    required: true,
  },
  website_link: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  rating: {
    type: Number,
  },
  category: {
    type: String,
  },
  product_type: {
    type: String,
    required: true,
  },
  tag_list: [String],
  created_at: {
    type: Date,
    required: true,
  },
  updated_at: {
    type: Date,
    required: true,
  },
  product_api_url: {
    type: String,
    required: true,
  },
  api_featured_image: {
    type: String,
    required: true,
  },
  product_colors: [
    {
      hex_value: {
        type: String,
      },
      colour_name: {
        type: String,
      },
    },
  ],
});

export type ProductType = InferSchemaType<typeof productSchema>;
export const Product = mongoose.model('Product', productSchema);
