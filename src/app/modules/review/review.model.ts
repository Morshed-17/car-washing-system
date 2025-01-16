import { model, Schema } from 'mongoose';

import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    feedback: {
      type: String,
      required: [true, 'feedback is required'],
    },
    rating: {
      type: Number,
      required: [true, 'username is required'],
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('Review', reviewSchema);
