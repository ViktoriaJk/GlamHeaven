import mongoose, { Schema, InferSchemaType } from 'mongoose';

const userSchema = new Schema({
  sub: { type: String, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  given_name: { type: String, required: true },
  picture: { type: String },
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
  ],
});

export type UserType = InferSchemaType<typeof userSchema>;
export const User = mongoose.model('User', userSchema);
