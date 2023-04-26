import express, { NextFunction, Request, Response } from 'express';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { z } from 'zod';
import mongoose from 'mongoose';
import { verifyToken } from '../middlewares/verifyToken';
import { verifySchema } from '../middlewares/verifySchema';

const router = express.Router();

const orderProductSchema = z.object({
  id: z.string().nonempty(),
  unitPrice: z.number().positive(),
  quantity: z.number().positive(),
  totalPrice: z.number().positive(),
});

const orderSchema = z.object({
  userId: z.string().nonempty(),
  products: z.array(orderProductSchema).nonempty(),
  totalOrderPrice: z.number().positive(),
  invoiceAddress: z.array(
    z.object({
      zipCode: z.string().nonempty(),
      street: z.string().nonempty(),
      houseNumber: z.string().nonempty(),
      country: z.string().nonempty(),
    })
  ),
  deliveryAddress: z.array(
    z.object({
      zipCode: z.string().nonempty(),
      street: z.string().nonempty(),
      houseNumber: z.string().nonempty(),
      country: z.string().nonempty(),
    })
  ),
  phoneNumber: z.string().nonempty(),
  deliveryOption: z.number().nonnegative(),
  paymentMethod: z.number().nonnegative(),
  createdAt: z.date(),
});

type Order = z.infer<typeof orderSchema>;

// router.get('/', verifyToken, async (req: Request, res: Response) => {
//   const user = res.locals.user;
//   const foundUser = await User.findById(user._id);

//   if (!foundUser) {
//     return res.status(400).json({ message: 'User not found.' });
//   }

//   const foundCart = await Cart.findOne({ userId: user._id }).populate(
//     'products',
//     'name price product_link'
//   );

//   res.sendStatus(200).json(foundCart);
// });

// ADD ITEM
/*router.post('/', verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user;
  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    return res.status(400).json({ message: 'User not found.' });
  }

  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(422).json('Invalid product id.');
  }

  const foundCart = await Cart.findOne({ userId: user._id });
  if (!foundCart) {
    const cart = await Cart.create<Cart>({
      userId: user._id,
      products: [{ id: productId, quantity: quantity }],
    });
    res.sendStatus(200).json(cart);
  } else {
    const productInCartIndex = foundCart.products.findIndex(
      (prod) => prod.id === productId
    );

    if (productInCartIndex > -1) {
      foundCart.products[productInCartIndex].quantity += quantity;
    } else {
      foundCart.products = [
        ...foundCart.products,
        { id: productId, quantity: quantity },
      ];
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: user._id },
      { $set: { products: foundCart.products } }
    );
    res.sendStatus(200).json(cart);
  }
  res.sendStatus(400);
});

// REMOVE ITEM
router.delete('/', verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user;
  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    return res.status(400).json({ message: 'User not found.' });
  }

  const { productId } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(422).json('Invalid product id.');
  }

  const foundCart = await Cart.findOne({ userId: user._id });
  if (foundCart) {
    const productInCartIndex = foundCart.products.findIndex(
      (prod) => prod.id === productId
    );

    if (productInCartIndex > -1) {
      // only splice array when item is found
      foundCart.products.splice(productInCartIndex, 1); // 2nd parameter means remove one item only
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: user._id },
      { $set: { products: foundCart.products } }
    );
    res.sendStatus(200).json(cart);
  }
  res.sendStatus(400);
});

// UPDATE ITEM
router.put('/', verifyToken, async (req: Request, res: Response) => {
  const user = res.locals.user;
  const foundUser = await User.findById(user._id);

  if (!foundUser) {
    return res.status(400).json({ message: 'User not found.' });
  }

  const { productId, quantity } = req.body;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(422).json('Invalid product id.');
  }

  const foundCart = await Cart.findOne({ userId: user._id });
  if (foundCart) {
    const productInCartIndex = foundCart.products.findIndex(
      (prod) => prod.id === productId
    );

    if (productInCartIndex > -1) {
      if (quantity === 0) {
        foundCart.products.splice(productInCartIndex, 1);
      } else {
        foundCart.products[productInCartIndex].quantity = quantity;
      }
    }

    const cart = await Cart.findOneAndUpdate(
      { userId: user._id },
      { $set: { products: foundCart.products } }
    );
    res.sendStatus(200).json(cart);
  }
  res.sendStatus(400);
});
*/

export default router;
