import express, { Request, Response } from 'express';
import { Product } from '../models/Product';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  return res.status(400).json('Minimum 3 characters must be provided.');
});

router.get('/:query', async (req: Request, res: Response) => {
  const query = req.params.query;

  if (query && query.length > 2) {
    const products = await Product.find({
      name: { $regex: '.*' + query + '.*', $options: 'i' },
    }).select('name api_featured_image price price_sign');
    if (products.length) {
      return res.json(products);
    } else {
      return res.status(404).json('No products found.');
    }
  }
  return res.status(400).json('Minimum 3 characters must be provided.');
});

export default router;
