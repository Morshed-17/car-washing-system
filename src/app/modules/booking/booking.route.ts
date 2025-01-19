import express from 'express';

import { BookingControllers } from './booking.controller';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/',
  auth('user'),
  BookingControllers.createBooking,
);

router.get('/', auth('admin'), BookingControllers.getAllBookings);

const router2 = express.Router();

router2.get('/', auth('user'), BookingControllers.getUserBooking);

export const BookingRoutes = router;
export const BookingRoutes2 = router2;
