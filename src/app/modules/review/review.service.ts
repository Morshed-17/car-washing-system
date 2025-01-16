import httpStatus from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReview = async (payload: TReview) => {
  const result = Review.create(payload);
  return result;
};

const getAllReviews = async () => {
  const result = await Review.find();
  return result;
};

export const ReviewServices = {
  createReview,

  getAllReviews,
};
