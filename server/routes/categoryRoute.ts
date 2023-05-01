import express, { Request, Response } from 'express';
import { Category, CategoryType } from '../models/Category';
import { Product, ProductType } from '../models/Product';

const router = express.Router();

router.get('/:url', async (req: Request, res: Response) => {
  const url = req.params.url;

  const category = await Category.findOne({ ufUrl: url });
  if (!category) {
    return res.status(400).json('Category not found.');
  } else {
    const categoryProducts = await Product.find({
      product_type: category.rawName,
    }).select('name api_featured_image price price_sign');
    if (categoryProducts) {
      return res.json({
        category: category,
        products: categoryProducts,
      });
    } else {
      return res.status(404).json('There are no products in this category.');
    }
  }
});

export default router;
