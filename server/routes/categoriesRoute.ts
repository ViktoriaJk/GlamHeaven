import express, { Request, Response } from 'express';
import { Category, CategoryType } from '../models/Category';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const categories = await Category.find().select('name rawName ufUrl');
  if (!categories) {
    res.status(404).json('There are no categories.');
  }
  res.json(categories);
});

export default router;
