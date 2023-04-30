import express, { NextFunction, Request, Response } from 'express';
import { Order } from '../models/Order';
import { User } from '../models/User';
import { Cart } from '../models/Cart';
import { z } from 'zod';
import mongoose from 'mongoose';
import { verifyToken } from '../middlewares/verifyToken';
import { verifySchema } from '../middlewares/verifySchema';

const router = express.Router();

const orderFormDataSchema = z.object({
  orderFormData: z.object({
    invoiceAddress: z.object({
      zipCode: z.string().nonempty(),
      city: z.string().nonempty(),
      street: z.string().nonempty(),
      houseNumber: z.string().nonempty(),
      country: z.string().nonempty(),
    }),
    deliveryAddress: z.object({
      zipCode: z.string().nonempty(),
      city: z.string().nonempty(),
      street: z.string().nonempty(),
      houseNumber: z.string().nonempty(),
      country: z.string().nonempty(),
    }),
    details: z.object({
      phoneNumber: z.string().nonempty(),
      deliveryOption: z.string().nonempty(),
      paymentMethod: z.string().nonempty(),
    }),
  }),
});

type OrderType = z.infer<typeof orderFormDataSchema>;

router.post(
  '/',
  verifySchema(orderFormDataSchema),
  verifyToken,
  async (req: Request, res: Response) => {
    const user = res.locals.user;
    const foundUser = await User.findById(user._id);

    if (!foundUser) {
      return res.status(400).json({ message: 'User not found.' });
    }

    const foundCart = await Cart.findOne({ userId: user._id });

    if (!foundCart) {
      return res.status(400).json({ message: 'Cart not found.' });
    }

    const orderData = req.body.orderFormData;

    const newOrder = await Order.create({
      userId: user._id,
      products: foundCart.products,
      totalOrderPrice: 0,
      invoiceAddress: orderData.invoiceAddress,
      deliveryAddress: orderData.deliveryAddress,
      details: orderData.details,
    });

    if (newOrder) {
      return res.status(200).json({ message: 'OK.' });
    } else {
      return res.status(404).json({ message: 'Order error.' });
    }
  }
);

export default router;
