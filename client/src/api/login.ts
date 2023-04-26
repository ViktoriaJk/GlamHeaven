import axios, { AxiosError } from 'axios';
import { z } from 'zod';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const client = axios.create({ baseURL: baseUrl });

export const $token = new BehaviorSubject<string | null>(
  localStorage.getItem('token')
);
export const endSession = () => {
  localStorage.removeItem('token');
  $token.next(null);
};

let tokenInterval: number | null = null;
$token.subscribe((token) => {
  if (tokenInterval) clearInterval(tokenInterval);
  tokenInterval = setInterval(() => {
    if (!token) return;
    const decoded = jwt_decode(token) as any;
    if (decoded.exp * 1000 < new Date().getTime()) {
      endSession();
    }
  }, 1000);
});

const ResponseSchema = z.object({ token: z.string() });
// type ResponseType = z.infer<typeof ResponseSchema>

export const login = async (code: string): Promise<string | null> => {
  try {
    const response = await client.post('/api/login', { code });
    const result = ResponseSchema.safeParse(response.data);
    if (!result.success) return null;
    const token = response.data.token;
    $token.next(token);
    localStorage.setItem('token', token);
    return token;
  } catch (err) {
    return null;
  }
};

/*
export const getSecret = async () => {
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
