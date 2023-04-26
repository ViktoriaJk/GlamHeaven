import { z } from 'zod';
import { request } from './request';

const ProductSchema = z.object({
  name: z.string(),
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
