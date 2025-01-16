import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import auth from '../../middlewares/auth';
import { ReviewController } from './review.controller';

const router = express.Router();

router.post(
  '/',
  auth('admin'),

  ReviewController.createReview,
);
router.get('/', ReviewController.getAllReviews);

export const ReviewRoute = router;
