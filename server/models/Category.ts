import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const categorySchema = new Schema({
  name: { type: String, required: true },
  ufUrl: { type: String, required: true },
  rawName: { type: String, required: true },
});

export type CategoryType = InferSchemaType<typeof categorySchema>;
export const Category = mongoose.model('Category', categorySchema);
