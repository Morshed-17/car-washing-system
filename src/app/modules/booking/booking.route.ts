import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.get('/', BookingControllers.getAllBookings);

export const BookingRoutes = router;
