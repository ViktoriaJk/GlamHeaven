import { z } from 'zod';
import { request } from './request';

const SearchProductListSchema = z
  .object({
    name: z.string(),
    _id: z.string(),
    api_featured_image: z.string(),
    price: z.number().nullable().optional(),
    price_sign: z.string().nullable().optional(),
  })
  .array();

export type SearchProductListType = z.infer<typeof SearchProductListSchema>;

export const getSearchResult = async (query: string | undefined) => {
  const response = await request(
    'get',
    `/api/search/${query}`,
    {},
    SearchProductListSchema
  );
  return response;
};
