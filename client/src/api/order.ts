import { z } from 'zod';
import { request } from './request';

const CartProductListSchema = z
  .object({
    _id: z.string(),
    name: z.string(),
    quantity: z.string(),
  })
  .array();

export type CartProductListType = z.infer<typeof CartProductListSchema>;

const productSchema = z.object({
  productId: z.object({
    _id: z.string(),
    name: z.string(),
    price: z.number(),
    price_sign: z.string(),
    api_featured_image: z.string(),
  }),
  quantity: z.number(),
});

const CartSchema = z.object({
  userId: z.string().nonempty({ message: 'The product id is required.' }),
  products: z.array(productSchema),
});

export type CartType = z.infer<typeof CartSchema>;

/* order */

type orderDetails = {
  invoiceAddress: {
    zipCode: string;
    city: string;
    street: string;
    houseNumber: string;
    country: string;
  };
  deliveryAddress: {
    zipCode: string;
    city: string;
    street: string;
    houseNumber: string;
    country: string;
  };
  details: {
    phoneNumber: string;
    deliveryOption: number;
    paymentMethod: number;
  };
};

export const saveOrder = async (orderFormData: orderDetails) => {
  const response = await request(
    'post',
    `/api/order`,
    { orderFormData },
    CartSchema
  );
  return response;
};
