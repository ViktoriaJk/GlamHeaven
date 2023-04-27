import { z } from 'zod';
import { request } from './request';

const ProductSchema = z.object({
  name: z.string(),
  _id: z.string(),
  api_featured_image: z.string(),
  price: z.number().nullable().optional(),
  price_sign: z.string().nullable().optional(),
  brand: z.string(),
  description: z.string(),
});

export type ProductType = z.infer<typeof ProductSchema>;

export const getProduct = async (id: string | undefined) => {
  const response = await request(
    'get',
    `/api/product/${id}`,
    {},
    ProductSchema
  );
  return response;
};
