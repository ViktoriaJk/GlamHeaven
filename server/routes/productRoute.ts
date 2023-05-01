import express, { Request, Response } from 'express';
import { Product, ProductType } from '../models/Product';
import mongoose from 'mongoose';

const router = express.Router();

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
