import express, { NextFunction, Request, Response } from 'express';
import { Cart, CartType } from '../models/Cart';
import { Product } from '../models/Product';
import { User } from '../models/User';
import { z } from 'zod';
import mongoose from 'mongoose';
import { UserVType, verifyToken } from '../middlewares/verifyToken';
import { verifySchema } from '../middlewares/verifySchema';
const router = express.Router();
/*
const { ObjectId } = mongoose.Types;

const productSchema = z.object({
  productId: z
    .string()
    .nonempty({ message: 'The product id is required.' })
    .transform((val) => new ObjectId(val)),
  quantity: z
    .number()
    .positive({ message: 'The quantity must be positive number.' }),
});

const CartSchema = z.object({
  userId: z.string().nonempty({ message: 'The product id is required.' }),
  products: z.array(productSchema),
});

type Cart = z.infer<typeof CartSchema>;
type CartProducts = z.infer<typeof productSchema>;

const deleteFromCartSchema = z.object({
  productId: z
    .string()
    .nonempty({ message: 'The product id is required.' })
    .transform((val) => new ObjectId(val)),
});

type deleteFromCartType = z.infer<typeof deleteFromCartSchema>;

//GET CART CONTENT

router.get('/wishlist', verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user as UserVType;
  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    return res.status(400).json({ message: 'User not found.' });
  } else {
    return res.status(200).json(foundUser.favourites);
  }
});

// ADD ITEM

router.post(
  '/wishlist',
  verifySchema(productSchema),
  verifyToken,
  async (req: Request, res: Response) => {
    const user = res.locals.user;
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const { productId, quantity } = req.body as CartProducts;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(422).json('Invalid product id.');
    }

    const foundProduct = await Product.findOne({ _id: productId });
    if (!foundProduct) {
      return res.status(422).json('Invalid product id.');
    }

    if (foundUser.favourites.includes(productId)) {
        
    }

        foundUser.favourites = [
          ...foundUser.favourites,
          {
            productId: productId,
            quantity: quantity,
            unitPrice: foundProduct.price,
            totalPrice: totalprice,
          },
        ];

      }

      let totalCartPrice = 0;
      totalCartPrice = foundCart.products.reduce(
        (accumulator, currentValue) => accumulator + currentValue.totalPrice,
        totalCartPrice
      );

      const cart = await Cart.findOneAndUpdate<Cart>(
        { userId: user._id },
        {
          $set: {
            products: foundCart.products,
            totalCartPrice: totalCartPrice,
          },
        }
      );
      if (cart) {
        return res.status(200).json(cart);
      } else {
        return res.status(404).json({ message: 'Update error.' });
      }
    }
    res.sendStatus(400);
  }
);

// REMOVE ITEM

router.delete(
  '/',
  verifySchema(deleteFromCartSchema),
  verifyToken,
  async (req: Request, res: Response) => {
    const user = res.locals.user;
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const { productId } = req.body as deleteFromCartType;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(422).json('Invalid product id.');
    }

    const foundCart = await Cart.findOne({ userId: user._id });
    if (foundCart) {
      const productInCartIndex = foundCart.products.findIndex(
        (prod) => prod.productId == productId
      );

      if (productInCartIndex > -1) {
        // only splice array when item is found
        foundCart.products.splice(productInCartIndex, 1); // 2nd parameter means remove one item only
      }

      const cart = await Cart.findOneAndUpdate<Cart>(
        { userId: user._id },
        { $set: { products: foundCart.products } }
      );
      if (cart) {
        return res.status(200).json(cart);
      } else {
        return res.status(404).json({ message: 'Update error.' });
      }
    }
    res.sendStatus(400);
  }
);
*/
export default router;
