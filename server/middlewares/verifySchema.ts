import { Request, Response, NextFunction } from 'express';
import { safeParse } from '../utility/safeParse';
import { z } from 'zod';

export const verifySchema =
  <Schema extends z.ZodTypeAny>(schema: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = safeParse(schema, req.body);
    if (!result) {
      return res.status(400).json({ error: 'Invalid request' });
    }
    next();
  };
