import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import z from 'zod';

const secretKey = process.env.JWT_SECRET as string;

const UserSchema = z.object({
  _id: z.string(),
  email: z.string(),
  sub: z.string(),
});
export type UserVType = z.infer<typeof UserSchema>;
//export type User = z.infer<typeof UserSchema>;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json('Requires authentication');

  const token = authHeader.split(' ')[1];
  if (token === 'null') return res.status(401).json('Requires authentication');

  try {
    const verifiedUser = jwt.verify(token, secretKey);
    const result = UserSchema.safeParse(verifiedUser);
    if (result.success === false) return res.sendStatus(401);
    res.locals.user = result.data;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401);
  }
};
