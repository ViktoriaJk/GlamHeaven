import axios, { AxiosError } from 'axios';
import { BehaviorSubject } from 'rxjs';
import jwt_decode from 'jwt-decode';
import { z } from 'zod';

const baseUrl = import.meta.env.VITE_SERVER_URL;

const client = axios.create({ baseURL: baseUrl });

type Response<T> = {
  data: T;
  status: number;
};

export const request = async <T extends z.ZodTypeAny>(
  method: string,
  path: string,
  payload: any,
  schema: T
): Promise<Response<z.infer<T>>> => {
  try {
    /*client.request({
      method,
      url: path,
      data: payload,
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('token')}`,
      },
    });*/
    const response = await client.request({
      method,
      url: path,
      data: payload,
      headers: {
        Authorization: `Bearer: ${localStorage.getItem('token')}`,
      },
    });

    const result = schema.safeParse(response.data);
    if (result.success) {
      return { data: result.data, status: response.status };
    } else {
      return { data: null, status: response.status };
    }

    /*return {
      data: response.data,
      status: response.status,
    };*/
  } catch (error) {
    const errorResponse = (error as AxiosError).response;
    if (errorResponse?.status === 401) endSession();
    if (errorResponse) {
      return {
        data: errorResponse.data,
        status: errorResponse.status,
      };
    }
    return {
      data: null,
      status: 0,
    };
  }
};

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
