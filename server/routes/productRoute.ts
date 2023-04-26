import express, { Request, Response } from 'express';
import { Product, ProductType } from '../models/Product';
import { z } from 'zod';
import mongoose from 'mongoose';

const router = express.Router();

// const productColorSchema = z.object({
//   hex_value: z.string(),
//   colour_name: z.string(),
// });

// const productSchema = z.object({
//   id: z.number(),
//   brand: z.string().optional(),
//   name: z.string(),
//   price: z.number().optional(),
//   price_sign: z.string().optional(),
//   currency: z.string().optional(),
//   image_link: z.string(),
//   product_link: z.string(),
//   website_link: z.string(),
//   description: z.string().optional(),
//   rating: z.number().optional(),
//   category: z.string().optional(),
//   product_type: z.string(),
//   tag_list: z.string().array(),
//   created_at: z.date(),
//   updated_at: z.date(),
//   product_api_url: z.string(),
//   api_featured_image: z.string(),
//   product_colors: z.array(productColorSchema).optional(),
// });

// type Product = z.infer<typeof productSchema>;

router.get('/', async (req: Request, res: Response) => {
  return res.status(404).json('Missing product ID.');
});

router.get('/:id', async (req: Request, res: Response) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(422).json('Invalid id.');
  }
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json('Product not found.');
  }
  res.json(product);
});

export default router;
