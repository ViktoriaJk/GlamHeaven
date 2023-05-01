import { z } from 'zod';
import { request } from './request';

const CategoryProductListSchema = z.object({
  category: z.object({
    name: z.string(),
  }),
  products: z
    .object({
      name: z.string(),
      _id: z.string(),
      api_featured_image: z.string(),
      price: z.number(),
      price_sign: z.string(),
    })
    .array(),
});

export type CategoryProductListType = z.infer<typeof CategoryProductListSchema>;

/* NEW */

export const getCategory = async (url: string | undefined) => {
  const response = await request(
    'get',
    `/api/category/${url}`,
    {},
    CategoryProductListSchema
  );
  return response;
};

/* OLD
export const getCategories = async (): Promise<CategoryType[] | null> => {
  try {
    const response = await client.get('/api/categories/');
    const result = CategoryListSchema.safeParse(response.data);
    if (!result.success) return null;
    return result.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};*/

/*export const getSecret = async () => {
  const response = await request("get", "/api/secret", null)
  console.log(response.data);
};

type Todo = {
  title: string,
  description: string
}

export const createTodo = async (todo: Todo) => {
  const response = await request("get", "/api/secret", todo)
  console.log(response.data);
};*/
