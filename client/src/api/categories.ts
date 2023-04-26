import { z } from 'zod';
import { request } from './request';

const CategorySchema = z
  .object({
    name: z.string(),
    ufUrl: z.string(),
    rawName: z.string(),
  })
  .array();

export type CategoryType = z.infer<typeof CategorySchema>;

/* NEW */

export const getCategories = async () => {
  const response = await request('get', '/api/categories', {}, CategorySchema);
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
