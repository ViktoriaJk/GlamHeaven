import dotenv from 'dotenv';
dotenv.config();
import { z } from 'zod';
import app from './app';
import mongoose from 'mongoose';

const envSchema = z.object({
  PORT: z.string(),
  MONGO_URI: z.string(),
  CLIENT_ID: z.string(),
  CLIENT_SECRET: z.string(),
  REDIRECT_URI: z.string(),
  JWT_SECRET: z.string(),
});

envSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}

const port = process.env.PORT;

mongoose.set('strictQuery', false);
mongoose
  .connect(`${process.env.MONGO_URI}`)
  .then(() => console.log('Connected to MongoDB!'));

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
