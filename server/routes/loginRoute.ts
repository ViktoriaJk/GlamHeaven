import dotenv from 'dotenv';
dotenv.config({
  path: '../.env',
});
import express, { Request, Response } from 'express';
import { z } from 'zod';
import { getIdToken } from '../api/google';
import jwt from 'jsonwebtoken';
import { safeParse } from '../utility/safeParse';
import { verifySchema } from '../middlewares/verifySchema';
import { User, UserType } from '../models/User';

const secretKey = process.env.JWT_SECRET;
if (!secretKey) {
  throw new Error('JWT_SECRET is not defined');
}

const LoginRequestSchema = z.object({
  code: z.string(),
});

type LoginRequest = z.infer<typeof LoginRequestSchema>;

const Payload = z.object({
  sub: z.string(),
  email: z.string().email(),
  name: z.string(),
  given_name: z.string(),
  picture: z.string(),
});

type PayLoad = z.infer<typeof Payload>;

const router = express.Router();

router.post(
  '/',
  verifySchema(LoginRequestSchema),
  async (req: Request, res: Response) => {
    const loginRequest = req.body as LoginRequest;
    const idToken = await getIdToken(loginRequest.code);
    console.log('idToken: ', idToken);
    if (!idToken) {
      return res.status(401).json({ error: 'Invalid code' });
    }
    const payload: unknown = jwt.decode(idToken);
    const result = safeParse(Payload, payload);

    if (!result) {
      return res.sendStatus(500);
    }

    const data: UserType = { ...result, favourites: [] };

    const foundUser = await User.findOne({ sub: data.sub });
    if (!foundUser) {
      const newUser = await User.create(data);
      const parseResult = safeParse(Payload, newUser);
      if (!parseResult) return res.sendStatus(500);
      const parseResult2 = { ...parseResult, _id: newUser._id }; ////
      const sessionToken = jwt.sign(parseResult2, secretKey, {
        expiresIn: '5h',
      });

      console.log('sessionToken', sessionToken);
      return res.json({ token: sessionToken });
    } else {
      const result2 = { ...result, _id: foundUser._id }; ////
      const sessionToken = jwt.sign(result2, secretKey, {
        expiresIn: '5h',
      });

      console.log('sessionToken', sessionToken);
      return res.json({ token: sessionToken });
    }
  }
);

export default router;
