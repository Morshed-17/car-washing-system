import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status-codes';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req, res) => {
  const result = await ReviewServices.createReview(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReviews = catchAsync(async (req, res) => {
  const result = await ReviewServices.getAllReviews();
  sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? httpStatus.OK : httpStatus.NOT_FOUND,
    message: result.length ? 'Reviews retrieved successfully' : 'No Data Found',
    data: result,
  });
});

export const ReviewController = {
  getAllReviews,
  createReview,
};
