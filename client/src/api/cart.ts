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
  totalPrice: z.number(),
  unitPrice: z.number(),
});

const CartSchema = z.object({
  userId: z.string().nonempty({ message: 'The product id is required.' }),
  products: z.array(productSchema),
  totalCartPrice: z.number(),
});

export type CartType = z.infer<typeof CartSchema>;

export const getCart = async () => {
  const response = await request('get', `/api/cart`, {}, CartSchema);
  return response;
};

export const addToCart = async (productId: string, quantity: number) => {
  const response = await request(
    'post',
    `/api/cart`,
    { productId, quantity },
    CartSchema
  );
  return response;
};

export const updateInCart = async () => {
  const response = await request('put', `/api/cart`, {}, CartProductListSchema);
  return response;
};

export const deleteFromCart = async (productId: string) => {
  const response = await request(
    'delete',
    `/api/cart`,
    { productId },
    CartSchema
  );
  return response;
};
