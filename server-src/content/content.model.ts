import { InferSchemaType } from 'mongoose';
import mongoose from '../helpers/db';

const contentsSchema = new mongoose.Schema(
  {
    type: {
      enum: ['article', 'video', 'podcast', 'book', 'youtube', 'course'],
      required: true,
      type: String
    },
    title: String
  },
  { timestamps: true }
);

export type TContent = InferSchemaType<typeof contentsSchema>;
export const Contents = mongoose.model('Contents', contentsSchema);
