import mongoose from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

const reviewSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export type ReviewType = InferSchemaType<typeof reviewSchema>;
export const Review = mongoose.model('Review', reviewSchema);
