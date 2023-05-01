import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import mongoose from 'mongoose';

const envSchema = z.object({
  PORT: z.string(),
  MONGO_URI: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string(),
  JWT_SECRET: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const port = process.env.PORT;

mongoose.set('strictQuery', false);
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log('Connected to MongoDB.'));

//build products and categories collection

import { Product } from '../models/Product';
import productsData from '../data/products.json';
import { Category } from '../models/Category';
import categoriesData from '../data/categories.json';

const buildDatabase = async () => {
  await Product.insertMany(productsData);
  console.log('Products inserted.');

  await Category.insertMany(categoriesData);
  console.log('Categories inserted.');

  mongoose.connection.close().then(() => console.log('Connection closed.'));
};

buildDatabase();
